<template>
  <nav class="navbar">
    <div class="logo">
      <i class="fas fa-recycle"></i>
      <span>Vintage Finds</span>
    </div>
    
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/upload">Sell Item</router-link>
      <router-link to="/profile">My Items</router-link>
      <router-link to="/admin">Admin</router-link>
    </div>
    
    <div class="user-actions">
      <div class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">3</span>
      </div>
      <div class="user-avatar">JD</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'StoreNavbar'
}
</script>