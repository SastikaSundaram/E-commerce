import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';  // Update import
import UploadView from '../views/UploadView.vue';  // Update import
import ProfileView from '../views/ProfileView.vue';  // Update import
import AdminView from '../views/AdminView.vue'; 

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/upload', name: 'Upload', component: UploadView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/admin', name: 'Admin', component: AdminView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;