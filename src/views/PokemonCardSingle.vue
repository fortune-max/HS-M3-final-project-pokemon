<script setup>
    import { ref } from 'vue';
    import router from '@/router';
    const textbox = ref("");
    const pokemonName = ref(textbox.value);
    const triggerInputRefresh = ref(0);

    function searchPokemon(){
        pokemonName.value = textbox.value;
        router.push({
            name: 'pokemon-card-wrapper',
            params: {
                pokemonName: pokemonName.value,
            },
        });
    }

    function updatePokemonName(childPokemonName){
        textbox.value = childPokemonName;
        pokemonName.value = childPokemonName;
        triggerInputRefresh.value++;
    }
</script>

<template>
    <div class="lookup-wrapper">
        <div class="search-box">
            <input placeholder="Enter Pokémon name" v-model="textbox" @change="searchPokemon" :key="triggerInputRefresh"/>
            <button @click="searchPokemon">Search</button>
        </div>
        <RouterView @update-pokemon-name="updatePokemonName"/>
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