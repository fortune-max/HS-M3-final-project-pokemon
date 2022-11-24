<script setup>
    import { ref } from 'vue';
    import router from '@/router';
    import LoadingCard from '../components/LoadingCard.vue';
    const textbox = ref("eevee");
    const pokemonName = ref(textbox.value);

    function searchPokemon(){
        pokemonName.value = textbox.value;
        router.push({
            name: 'pokemon-card',
            params: {
                pokemonName: pokemonName.value,
            },
        });
    }
</script>

<template>
    <div class="lookup-wrapper">
        <div class="search-box">
            <input placeholder="Enter Pokémon name" v-model="textbox" @change="searchPokemon"/>
            <button @click="searchPokemon">Search</button>
        </div>
        <Suspense>
            <router-view/>
            <template #fallback>
                <LoadingCard width="250px" height="400px"/>
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
    .lookup-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .search-box {
        display: flex;
        gap: 5px;
    }
</style>