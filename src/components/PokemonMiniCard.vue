<script setup>
    const props = defineProps(['pokemon', 'pokemonName']);
    const nameToUrl = (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    async function getPokemon(pokemonUrl){
        let res = await fetch(pokemonUrl);
        if (res.ok) return await res.json();
        return {};
    }

    let pokemon = await getPokemon(props.pokemon?.url || nameToUrl(props.pokemonName));
    let species = await fetch(pokemon.species.url).then((res)=>res.json());
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
        width: fit-content;
        align-items: center;
    }

    .card-container:hover{
        background-color: aqua;
    }

    img {
        width: 96px;
        height: 96px;
    }

    .pokemon-name {
        font-weight: bold;
        text-transform: capitalize;
    }

</style>