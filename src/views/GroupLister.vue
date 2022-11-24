<script setup>
    import { ref, toRef, watch } from 'vue';
    import ListItem from '../components/ListItem.vue';
    const props = defineProps(["mainCategory"]);
    const mainCategory = toRef(props, "mainCategory");
    const list = ref([]);
    const triggerSuspense = ref(0);

    async function getList(category){
        const res = await fetch(`https://pokeapi.co/api/v2/${category}`);
        if (res.ok)
            return (await res.json()).results;
        return [];
    }

    watch(mainCategory, async () => {
        triggerSuspense.value++;
        list.value = await getList(mainCategory.value);
    });

    list.value = await getList(mainCategory.value);
</script>

<template>
    <Suspense :key="triggerSuspense">
        <div class="links-container">
            <div v-for="item in list">
                <ListItem :url="item.url" :name="item.name" />
            </div>
        </div>
        <template #fallback>
            Loading {{mainCategory}} categories...
        </template>
    </Suspense>
</template>

<style scoped>
.links-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 20px;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    border: 2px solid black;
    background-color: bisque;
    color: bisque;
    height: 420px;
}
</style>
