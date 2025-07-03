import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Ensure correct path to store
import './assets/main.css';

// Create the Vue application
const app = createApp(App);

// IMPORTANT: Add store BEFORE router
app.use(store);
app.use(router);

// Mount the app
app.mount('#app');

// Optional: Add router ready check for debugging
router.isReady().then(() => {
  console.log('Router is ready!');
  console.log('Initial route:', router.currentRoute.value.fullPath);
});