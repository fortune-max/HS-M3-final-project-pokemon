<script setup>
    import { ref, toRef, watch } from 'vue';
    const props = defineProps(["mainCategory"]);
    const mainCategory = toRef(props, "mainCategory");
    const list = ref([]);

    async function getList(category){
        const res = await fetch(`https://pokeapi.co/api/v2/${category}`);
        if (res.ok)
            return (await res.json()).results;
        return [];
    }

    watch(mainCategory, async () => {
        list.value = await getList(mainCategory.value);
    });

    list.value = await getList(mainCategory.value);
</script>

<template>
    <div v-for="item in list">
        <a href="item.url">{{item.name}}</a>
    </div>
</template>