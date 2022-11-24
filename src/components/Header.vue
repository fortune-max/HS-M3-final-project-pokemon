<template>
    <div class="header-wrapper">
        <img src="../assets/pokemon_logo.png"/>
        <nav>
            <router-link to="/group/type">Type</router-link>
            <router-link to="/group/pokemon-color">Color</router-link>
            <router-link to="/group/pokemon-habitat">Habitat</router-link>
            <router-link to="/group/pokemon-shape">Shape</router-link>
            <router-link to="/legacy-lookup">Legacy Lookup</router-link>
        </nav>
    </div>
</template>

<style scoped>
    .header-wrapper {
        background-color: cornflowerblue;
    }

    img {
        width: 30%;
        padding-left: 10px;
    }

    nav {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        padding-right: 10px;
        padding-bottom: 10px;
    }
</style>