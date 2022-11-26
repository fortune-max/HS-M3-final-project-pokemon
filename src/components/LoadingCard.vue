<script setup>
import { ref } from 'vue';
    const props = defineProps(["miniCard", "error", "cardText"]);
    const cardClasses = ref(["base-styles"]);

    if (props.miniCard)
        cardClasses.value.push("mini-card");
    else
        cardClasses.value.push("maxi-card");

    if (props.error)
        cardClasses.value.push("error");
    else
        cardClasses.value.push("fast-gradient");
</script>

<template>
    <div :class="cardClasses" :style="{height, width}">
        <template v-if="error">
            {{cardText}}
        </template>
    </div>
</template>

<style scoped>

    .base-styles {
        border: solid 2px black;
        border-radius: 5px;
    }

    .fast-gradient {
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1)
        );
        background-size: 200% 200%;
        animation: gradient 2s ease-in-out infinite;
        z-index: 10;
        background-color: aqua;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .error {
        background-color: red;
        text-align: center;
        font-size: xx-large;
        display: flex;
        align-items: center;
        color: white;
    }

    .maxi-card {
        width: 250px;
        height: 400px;
    }

    .mini-card {
        width: 110px;
        height: 120.5px;
    }
</style>