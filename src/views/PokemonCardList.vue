<script setup>
    import { ref, computed } from 'vue';
    import PokemonCard from '@/components/PokemonCard.vue';
    import LoadingCard from '../components/LoadingCard.vue';
    const props = defineProps(["mainCategory", "subCategory"]);
    const pokemonNames = ref(window.history.state.pokemonNames);
    const miniCard = ref(true);
    const loadingCardWidth = computed(()=>{
        return miniCard.value ? "110px" : "250px";
    });
    const loadingCardHeight = computed(()=>{
        return miniCard.value ? "120.5px" : "400px";
    });
</script>

<template>
    <div class="card-list-wrapper">
        <h2>{{subCategory}} Pokemon</h2>
        <div class="card-list-container">
            <template v-for="pokemonName in pokemonNames">
                <Suspense>
                    <PokemonCard :pokemonName="pokemonName" :hideDescription="true" :miniCard="miniCard"/>
                    <template #fallback>
                        <LoadingCard :width="loadingCardWidth" :height="loadingCardHeight"/>
                    </template>
                </Suspense>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .card-list-container {
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

    .card-list-wrapper h2 {
        text-transform: capitalize;
        text-align: center;
        color: white;
    }

    .loading-card {
        width: 250px;
        height: 400px;
    }

    .loading-card-mini {
        width: 110px;
        height: 120.5px;
    }

</style>
