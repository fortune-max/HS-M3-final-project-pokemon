<script setup>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
</script>

<template>
    <div class="page-wrapper">
        <header>
            <Header/>
        </header>

        <main>
            <Suspense>
                <router-view/>
            </Suspense>
        </main>

        <footer>
            <Footer/>
        </footer>
    </div>
</template>

<style scoped>
    .page-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        padding: 20px;
        background-color: blueviolet;
        height: inherit;
        flex-grow: 1;
    }

</style>
