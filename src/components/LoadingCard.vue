<script setup>
    defineProps(["width", "height"]);
</script>

<template>
    <div class="fast-gradient" :style="{height, width}" style="background-color: aqua;">

    </div>
</template>

<style scoped>
    .fast-gradient {
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1)
        );
        background-size: 200% 200%;
        animation: gradient 2s ease-in-out infinite;
        z-index: 10;

        border: solid 2px black;
        border-radius: 5px;
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
</style>