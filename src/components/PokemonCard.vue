<script setup>
    import { ref, toRef, watch } from 'vue';
    const props = defineProps(['pokemonName', 'hideDescription', 'miniCard', 'failSilently']);
    const emit = defineEmits(["updatePokemonName"]);
    const nameToUrl = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemonName = toRef(props, 'pokemonName');
    const pokemon = ref(null), species = ref(null);
    const renderCard = ref(true);

    async function getPokemon(pokemonUrl){
        let res = await fetch(pokemonUrl);
        if (res.ok) return await res.json();
        if (!props.failSilently) throw new Error(`Invalid Pokemon ${pokemonName.value}`);
        renderCard.value = false;
    }

    watch(pokemonName, async ()=>{
        if (!props.miniCard) emit("updatePokemonName", pokemonName.value);
        pokemon.value = await getPokemon(nameToUrl(pokemonName.value));
        if (renderCard.value)
            species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
    });

    if (!props.miniCard) emit("updatePokemonName", pokemonName.value);
    pokemon.value = await getPokemon(nameToUrl(pokemonName.value));
    if (renderCard.value)
        species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
    let defaultImageMini = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png';
    let defaultImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
</script>

<template>
    <template v-if="renderCard">
        <div class="card-container mini" :class="species.color.name" v-if="miniCard">
            <img :src="pokemon.sprites.front_default || defaultImageMini">
            <div class="pokemon-name">{{pokemon.name}}</div>
        </div>
        <div class="card-text-wrapper" v-else>
            <div class="card-container" :class="species.color.name">
                <div class="pokemon-name">{{pokemon.name}}</div>
                <img :src="pokemon.sprites.other['official-artwork'].front_default || defaultImage">
                <div>Height: {{pokemon.height / 10}}m</div>
                <div>Weight: {{pokemon.weight / 10}}kg</div>
                <div>Type:
                    <span v-for="pokemonType in pokemon.types">
                        {{pokemonType.type.name}}&nbsp;
                    </span>
                </div>
                Moves list:
                <ul>
                    <li v-for="ability in pokemon.abilities">{{ability.ability.name}}</li>
                </ul>
                <div>Egg Group:
                    <span v-for="egg_group in species.egg_groups">
                        {{egg_group.name}}&nbsp;
                    </span>
                </div>
            </div>
            <div v-if="!hideDescription" class="flavor-text">{{species.flavor_text_entries[0]?.flavor_text}}</div>
            <div v-if="!hideDescription" class="form-description">{{species.form_descriptions[0]?.description}}</div>
        </div>
    </template>
</template>

<style scoped>
    .card-text-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }

    .card-container {
        border-radius: 5px;
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 400px;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 10px;
    }

    .card-text-wrapper img {
        width: 135px;
        height: 169px;
    }

    .pokemon-name {
        font-weight: bold;
        text-transform: capitalize;
        font-size: large;
    }

    .flavor-text, .form-description {
        color: white;
    }
    
    .mini {
        width: 110px;
        padding: 0px;
        height: fit-content;
    }

    .mini img {
        width: 96px;
        height: 96px;
    }

</style>
