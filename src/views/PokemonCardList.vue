<script setup>
    import { ref } from 'vue';
    import PokemonCard from '@/components/PokemonCard.vue';
    import LoadingCard from '../components/LoadingCard.vue';
    const props = defineProps(["mainCategory", "subCategory"]);
    const pokemonNames = ref(window.history.state.pokemonNames);
</script>

<template>
    <h2>{{subCategory}} Pokemon</h2>
    <div class="card-container">
        <div v-for="pokemonName in pokemonNames">
            <Suspense>
                <PokemonCard :pokemonName="pokemonName" :hideDescription="true"/>
                <template #fallback>
                    <LoadingCard width="250px" height="400px"/>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<style scoped>
    .card-container {
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
        color: white;
    }
</style>
