<script setup>
    import { ref, toRef, watch } from 'vue';
    const props = defineProps(['pokemonName', 'hideDescription']);
    const nameToUrl = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemon = ref(null);
    const species = ref(null);
    const pokemonName = toRef(props, 'pokemonName');

    async function getPokemon(pokemonUrl){
        let res = await fetch(pokemonUrl);
        if (res.ok) return await res.json();
        throw new Error(`invalid Pokemon ${pokemonUrl}`);
    }

    watch(pokemonName, async ()=>{
        pokemon.value = await getPokemon(nameToUrl(pokemonName.value));
        species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
    });

    pokemon.value = await getPokemon(nameToUrl(pokemonName.value));
    species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
    let defaultImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
</script>
<template>
    <div class="card-text-wrapper">
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

    img {
        width: 135px;
        height: 169px;
    }

    .pokemon-name {
        font-weight: bold;
        text-transform: capitalize;
        font-size: large;
    }
    
</style>
