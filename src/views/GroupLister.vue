<script setup>
    import { ref, toRef, watch } from 'vue';
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
                <a :href="item.url">{{item.name}}</a>
            </div>
        </div>
        <template #fallback>
            Loading {{mainCategory}} categories...
        </template>
    </Suspense>
</template>

<style scoped>
.links-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 20px;
}
</style>
