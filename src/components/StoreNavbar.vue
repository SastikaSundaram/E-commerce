<template>
  <nav class="navbar">
    <div class="logo">
      <i class="fas fa-recycle"></i>
      <span>Vintage Finds</span>
    </div>
    
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/upload">Sell Item</router-link>
      <router-link to="/profile">My Profile</router-link>
      <router-link to="/admin" v-if="user.isAdmin">Admin</router-link>
    </div>
    
    <div class="user-actions">
      <router-link to="/cart" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">{{ cartItemCount }}</span>
      </router-link>
      <div class="user-avatar">{{ userInitials }}</div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'StoreNavbar',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['cartItemCount']),
    userInitials() {
      return this.user.name.split(' ').map(n => n[0]).join('');
    }
  }
}
</script>