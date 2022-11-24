<script setup>
    import router from '@/router';
    const props = defineProps(["mainCategory", "subCategory", "url"]);

    async function gotoMiniCardsList(){
        const res = await fetch(props.url);
        if (!res.ok) throw new Error("Invalid subcategory");
        if (props.mainCategory === "type"){
            let pokemonList = (await res.json()).pokemon.map(x=>x.pokemon.name).sort();
            router.push({
                name: 'pokemon-mini-card-list',
                params: {
                    mainCategory: props.mainCategory,
                    subCategory: props.subCategory,
                },
                state: {
                    pokemonNames: pokemonList,
                },
            });
        }
        else{
            let speciesList = (await res.json()).pokemon_species.map(x=>x.name).sort();
            router.push({
                name: 'pokemon-mini-card-list',
                params: {
                    mainCategory: props.mainCategory,
                    subCategory: props.subCategory,
                },
                state: {
                    pokemonNames: speciesList,
                },
            });
        }
    }

</script>

<template>
    <div @click="gotoMiniCardsList">
        {{subCategory}}
    </div>
</template>

<style scoped>
div {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background-color: green;
    display: grid;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
}

div:hover {
    background-color: yellow;
    color: black;
}
</style>