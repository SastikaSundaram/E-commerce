import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UploadView from '@/views/UploadView.vue';
import ProfileView from '@/views/ProfileView.vue';
import AdminView from '@/views/AdminView.vue';
import CartView from '@/views/CartView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/upload', name: 'Upload', component: UploadView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/cart', name: 'Cart', component: CartView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;