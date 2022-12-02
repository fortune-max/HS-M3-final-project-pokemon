<script setup>
    import { ref } from 'vue';
    import PokemonCard from '@/components/PokemonCard.vue';
    import LoadingCard from '../components/LoadingCard.vue';
    const props = defineProps(["mainCategory", "subCategory"]);
    const pokemonNames = ref(window.history.state.pokemonNames);
    const miniCard = ref(true);
</script>

<template>
    <div class="card-list-wrapper">
        <h2>{{subCategory}} Pokemon</h2>
        <div class="card-choice">
            <span>
                <input type="radio" id="option-mini" v-model="miniCard" :value="true" />
                <label for="option-mini">Mini Cards</label>
            </span>
            <span>
                <input type="radio" id="option-maxi" v-model="miniCard" :value="false" />
                <label for="option-maxi">Maxi Cards</label>
            </span>
        </div>
        <div class="card-list-container">
            <template v-for="pokemonName in pokemonNames">
                <Suspense>
                    <PokemonCard :pokemonName="pokemonName" :hideDescription="true" :miniCard="miniCard" :failSilently="true"/>
                    <template #fallback>
                        <LoadingCard :miniCard="miniCard"/>
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

    .card-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .card-choice {
        display: flex;
        gap: 10px;
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
