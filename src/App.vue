<script setup>
  import { ref } from 'vue';
  import LoadingPokemon from './components/LoadingPokemon.vue';
  import PokemonCard from './components/PokemonCard.vue';
  
  const textbox = ref("eevee");
  const pokemonName = ref(textbox.value);
  const triggerSuspense = ref(0);

  function searchPokemon(){
    triggerSuspense.value++;
    pokemonName.value = textbox.value;
  }

</script>

<template>
  <input placeholder="Enter Pokémon name" v-model="textbox" @change="searchPokemon"/>
  <button @click="searchPokemon">Search</button>
  <Suspense :key="triggerSuspense">
    <PokemonCard :pokemon-name="pokemonName" />
    <template #fallback>
      <LoadingPokemon height="600px"/>
    </template>
  </Suspense>
</template>
