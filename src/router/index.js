import { createRouter, createWebHistory } from 'vue-router';

// Async loading of Views
const HomePage = () => import('@/views/HomePage.vue');
const NotFound = () => import('@/views/NotFound.vue');
const GroupLister = () => import('@/views/GroupLister.vue');
const PokemonCard = () => import('@/components/PokemonCard.vue');
const PokemonCardList = () => import('@/views/PokemonCardList.vue');
const PokemonCardSingle = () => import('@/views/PokemonCardSingle.vue');
const PokemonCardWrapper = () => import('@/components/PokemonCardWrapper.vue');


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
  },
  {
    path: '/group/:mainCategory/:subCategory',
    name: 'pokemon-card-list',
    component: PokemonCardList,
    props: true
  },
  {
    path: '/card/',
    name: 'pokemon-card-single',
    component: PokemonCardSingle,
    children: [
      {
        path: ':pokemonName',
        name: 'pokemon-card-wrapper',
        component: PokemonCardWrapper,
        props: true,
      }
    ]
  },
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
