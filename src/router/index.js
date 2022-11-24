import { createRouter, createWebHistory } from 'vue-router';

// Async loading of Views
const HomePage = () => import('@/views/HomePage.vue');
const NotFound = () => import('@/views/NotFound.vue');
const GroupLister = () => import('@/views/GroupLister.vue');
const PokemonMiniCardList = () => import('@/views/PokemonMiniCardList.vue');
const PokemonMiniCard = () => import('@/components/PokemonMiniCard.vue');
//const PokemonCard = () => import('@/components/PokemonCard.vue');
//const PokemonLegacyLookup = () => import('@/views/PokemonLegacyLookup.vue');
//const PokemonDetail = () => import('@/views/PokemonDetail.vue');

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
  },
  {
    path: '/group/:mainCategory',
    name: 'pokemon-grouping',
    component: GroupLister,
    props: true,
    children: [
      
    ],
  },
  {
    path: '/group/:mainCategory/:subCategory',
    name: 'pokemon-mini-card-list',
    component: PokemonMiniCardList,
    props: true
  },
  {
    path: '/mini-card/:pokemonName',
    name: 'pokemon-mini-card',
    component: PokemonMiniCard,
    props: true,
  },
  /*
  {
    path: '/legacy-lookup',
    name: 'legacy-lookup',
    component: PokemonLegacyLookup,
  },
  {
    path: '/pokemon/:pokemon-name',
    name: 'pokemon-card',
    component: PokemonCard,
    props: true,
    children: [
        {path: 'detail', name: 'pokemon-detail', component: PokemonDetail },
    ],
  },
  */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
