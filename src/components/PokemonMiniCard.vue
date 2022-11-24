<script setup>
    import { ref } from 'vue';
    const props = defineProps(['pokemonName']);
    const nameToUrl = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemon = ref(null);
    const species = ref(null);

    async function getPokemon(pokemonUrl){
        let res = await fetch(pokemonUrl);
        if (res.ok) return await res.json();
        throw new Error(`invalid Pokemon ${pokemonUrl}`);
    }

    pokemon.value = await getPokemon(nameToUrl(props.pokemonName));
    species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
</script>

<template>
    <div class="card-container" :class="species?.color?.name">
        <img :src="pokemon?.sprites?.front_default">
        <div class="pokemon-name">{{pokemon?.name}}</div>
    </div>
</template>

<style scoped>
    .card-container {
        border-radius: 5px;
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        width: 110px;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    img {
        width: 96px;
        height: 96px;
    }

    .pokemon-name {
        font-weight: bold;
        text-transform: capitalize;
        font-size: large;
    }

</style>