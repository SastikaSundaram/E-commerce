import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Import store directly

import HomeView from '@/views/HomeView.vue';
import UploadView from '@/views/UploadView.vue';
import ProfileView from '@/views/ProfileView.vue';
import AdminView from '@/views/AdminView.vue';
import CartView from '@/views/CartView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: { title: 'Vintage Finds - Home' }
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView,
    meta: { title: 'Vintage Finds - Sign In' }
  },
  { 
    path: '/signup', 
    name: 'Signup', 
    component: SignupView,
    meta: { title: 'Vintage Finds - Create Account' }
  },
  { 
    path: '/upload', 
    name: 'Upload', 
    component: UploadView,
    meta: { requiresAuth: true, title: 'Sell an Item' }
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    component: ProfileView,
    meta: { requiresAuth: true, title: 'My Profile' }
  },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin Dashboard' }
  },
  { 
    path: '/cart', 
    name: 'Cart', 
    component: CartView,
    meta: { title: 'Shopping Cart' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Use imported store directly in the navigation guard
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'Vintage Finds';
  
  // Use store directly to get authentication state
  const isAuthenticated = store.getters.isAuthenticated;
  const currentUser = store.getters.currentUser;
  const isAdmin = currentUser?.isAdmin;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } 
  else if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next('/');
  }
  else {
    next();
  }
});

export default router;