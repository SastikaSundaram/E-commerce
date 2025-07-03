<template>
  <div>
    <h1 class="page-title">Your Profile</h1>
    
    <div class="profile-container">
      <div class="profile-sidebar">
        <div class="profile-header">
          <div class="profile-avatar">
            {{ userInitials }}
          </div>
          <div class="profile-name">{{ user.name }}</div>
          <div class="profile-email">{{ user.email }}</div>
        </div>
        
        <div class="profile-stats">
          <div class="stat-card">
            <div class="stat-number">{{ userProducts.length }}</div>
            <div class="stat-label">Items Listed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ wishlist.length }}</div>
            <div class="stat-label">Wishlist</div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Email Notifications</label>
          <select class="form-control">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>
        
        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
          <i class="fas fa-cog"></i> Account Settings
        </button>
      </div>
      
      <div class="profile-content">
        <h2>Your Listed Items</h2>
        
        <div v-if="userProducts.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <p>You haven't listed any items yet.</p>
          <router-link to="/upload" class="btn btn-primary">List an Item</router-link>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard 
            v-for="item in userProducts" 
            :key="item.id" 
            :product="item" 
          />
        </div>
        
        <h2 style="margin-top: 3rem;">Your Wishlist</h2>
        
        <div v-if="wishlist.length === 0" class="empty-state">
          <i class="fas fa-heart"></i>
          <p>Your wishlist is empty.</p>
          <router-link to="/" class="btn btn-primary">Browse Products</router-link>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard 
            v-for="item in wishlistProducts" 
            :key="item.id" 
            :product="item" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // Removed mapGetters import
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProfileView',
  components: { ProductCard },
  computed: {
    ...mapState(['user', 'userProducts', 'wishlist', 'products']),
    userInitials() {
      return this.user.name.split(' ').map(n => n[0]).join('');
    },
    wishlistProducts() {
      return this.products.filter(p => this.wishlist.includes(p.id));
    }
  }
}
</script>