<script setup>
    import { ref } from 'vue';
    const props = defineProps(['pokemonName']);
    const nameToUrl = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemon = ref(null);
    const species = ref(null);

    async function getPokemon(pokemonUrl){
        console.log(pokemonUrl);
        let res = await fetch(pokemonUrl);
        if (res.ok) return await res.json();
        throw new Error(`invalid Pokemon ${pokemonUrl}`);
    }

    pokemon.value = await getPokemon(nameToUrl(props.pokemonName));
    species.value = await fetch(pokemon.value.species.url).then((res)=>res.json());
    let defaultImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg';
</script>
<template>
    <div class="card-container" :class="species.color.name">
        <img :src="pokemon.sprites.other.dream_world.front_default || defaultImage">
        <div class="pokemon-name">{{pokemon?.name}}</div>
    </div>
</template>

<style scoped>

    .card-container {
        border-radius: 5px;
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        width: 250px;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
