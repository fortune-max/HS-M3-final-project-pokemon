<script setup>
    import { ref } from 'vue';
    import router from '@/router';
    import LoadingCard from '../components/LoadingCard.vue';
    const textbox = ref("");
    const pokemonName = ref(textbox.value);
    const triggerSuspense = ref(0);
    const inputReloader = ref(0);

    function searchPokemon(){
        triggerSuspense.value++;
        pokemonName.value = textbox.value;
        router.push({
            name: 'pokemon-card',
            params: {
                pokemonName: pokemonName.value,
            },
        });
    }

    function updatePokemonName(childPokemonName){
        textbox.value = childPokemonName;
        pokemonName.value = childPokemonName;
        inputReloader.value++;
    }
</script>

<template>
    <div class="lookup-wrapper">
        <div class="search-box">
            <input placeholder="Enter Pokémon name" v-model="textbox" @change="searchPokemon" :key="inputReloader"/>
            <button @click="searchPokemon">Search</button>
        </div>
        <router-view v-slot="{ Component }" @update-pokemon-name="updatePokemonName">
            <Suspense timeout="0" :key="triggerSuspense">
                <component :is="Component" />
                <template #fallback>
                    <LoadingCard width="250px" height="400px"/>
                </template>
            </Suspense>
        </router-view>
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