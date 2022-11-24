<script setup>
    import { ref } from 'vue';
    import PokemonMiniCard from '@/components/PokemonMiniCard.vue';
    const props = defineProps(["mainCategory", "subCategory"]);
    const pokemonNames = ref(window.history.state.pokemonNames);
</script>

<template>
    <h2>{{subCategory}} Pokemon</h2>
    <div class="mini-card-container">
        <PokemonMiniCard v-for="pokemonName in pokemonNames" :pokemonName="pokemonName"/>
    </div>
</template>

<style scoped>
    .mini-card-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-items: center;
        gap: 20px;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
        border: 2px solid black;
        background-color: chartreuse;
    }

    h2 {
        text-transform: capitalize;
        text-align: center;
    }
</style>