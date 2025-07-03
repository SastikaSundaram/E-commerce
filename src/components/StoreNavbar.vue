<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">
        <i class="fas fa-recycle"></i>
        <span>Vintage Finds</span>
      </router-link>
    </div>
    
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/upload" v-if="isAuthenticated">Sell Item</router-link>
      <router-link to="/profile" v-if="isAuthenticated">My Profile</router-link>
      <router-link to="/admin" v-if="isAdmin">Admin</router-link>
    </div>
    
    <div class="user-actions">
      <router-link to="/cart" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">{{ cartItemCount }}</span>
      </router-link>
      
      <div v-if="isAuthenticated" class="user-dropdown">
        <div class="user-avatar" @click="toggleDropdown">
          {{ userInitials }}
        </div>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <div class="dropdown-header">
            <div class="dropdown-avatar">{{ userInitials }}</div>
            <div class="dropdown-info">
              <div class="user-name">{{ currentUser.name }}</div>
              <div class="user-email">{{ currentUser.email }}</div>
            </div>
          </div>
          <router-link to="/profile" class="dropdown-item">
            <i class="fas fa-user"></i> Profile
          </router-link>
          <router-link to="/settings" class="dropdown-item">
            <i class="fas fa-cog"></i> Settings
          </router-link>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>

      <div v-else class="auth-buttons">
        <router-link to="/login" class="login-btn">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </router-link>
        <router-link to="/signup" class="signup-btn">
          <i class="fas fa-user-plus"></i> Sign Up
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'StoreNavbar',
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: {
    ...mapGetters(['cartItemCount', 'isAuthenticated', 'currentUser']),
    isAdmin() {
      return this.currentUser?.isAdmin;
    },
    userInitials() {
      return this.currentUser?.name.split(' ').map(n => n[0]).join('') || '';
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>

<style scoped>
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  padding: 1rem;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 1rem;
}

.dropdown-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
}

.user-email {
  font-size: 0.8rem;
  color: var(--gray);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  text-decoration: none;
  color: var(--dark);
  transition: var(--transition);
  gap: 10px;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-divider {
  height: 1px;
  background: #eee;
}

.login-btn {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
}

.login-btn:hover {
  background: var(--primary-dark);
}
.auth-buttons {
  display: flex;
  gap: 0.8rem;
}

.login-btn, .signup-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
  font-weight: 500;
}

.login-btn {
  background: var(--primary);
  color: white;
}

.login-btn:hover {
  background: var(--primary-dark);
}

.signup-btn {
  background: white;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.signup-btn:hover {
  background: #f5f5f5;
}
</style>