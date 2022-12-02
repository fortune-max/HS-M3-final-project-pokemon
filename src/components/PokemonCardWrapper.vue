<script setup>
    import { ref, toRef, watch, onErrorCaptured } from 'vue';
    import LoadingCard from './LoadingCard.vue';
    import PokemonCard from './PokemonCard.vue';
    const props = defineProps(['pokemonName']);
    const emit = defineEmits(['updatePokemonName']);
    const pokemonName = toRef(props, 'pokemonName');
    const invalidPokemon = ref(false);
    const triggerSuspense = ref(0);

    watch(pokemonName, ()=>{
        emit('updatePokemonName', pokemonName.value);
        triggerSuspense.value++;
    });

    onErrorCaptured((err) => {
        invalidPokemon.value = true;
    });

    emit('updatePokemonName', pokemonName.value);
</script>
<template>
    <Suspense :key="triggerSuspense">
        <PokemonCard :pokemon-name="pokemonName"/>
        <template #fallback>
            <LoadingCard :error="invalidPokemon"/>
        </template>
    </Suspense>
</template>