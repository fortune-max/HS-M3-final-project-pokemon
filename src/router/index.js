import { createRouter, createWebHistory } from 'vue-router';

// Async loading of Views
const HomePage = () => import('@/views/HomePage.vue');
const NotFound = () => import('@/views/NotFound.vue');
const GroupLister = () => import('@/views/GroupLister.vue');
const PokemonMiniCardList = () => import('@/views/PokemonMiniCardList.vue');
const PokemonMiniCard = () => import('@/components/PokemonMiniCard.vue');
const PokemonCard = () => import('@/views/PokemonCard.vue');
const PokemonCardList = () => import('@/views/PokemonCardList.vue');
const PokemonCardSingle = () => import('@/views/PokemonCardSingle.vue');

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
    name: 'pokemon-mini-card-list',
    component: PokemonMiniCardList,
    props: true
  },
  {
    path: '/group-detailed/:mainCategory/:subCategory',
    name: 'pokemon-card-list',
    component: PokemonCardList,
    props: true
  },
  {
    path: '/mini-card/:pokemonName',
    name: 'pokemon-mini-card',
    component: PokemonMiniCard,
    props: true,
  },
  {
    path: '/card/',
    name: 'pokemon-card-single',
    component: PokemonCardSingle,
    props: true,
    children: [
      {
        path: '/card/:pokemonName',
        name: 'pokemon-card',
        component: PokemonCard,
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
