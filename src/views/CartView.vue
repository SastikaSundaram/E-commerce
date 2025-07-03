<template>
  <div>
    <h1 class="page-title">Your Shopping Cart</h1>
    
    <div class="cart-container">
      <div v-if="cart.length === 0" class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <router-link to="/" class="btn btn-primary">Continue Shopping</router-link>
      </div>
      
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="cart-item-details">
            <h3 class="cart-item-title">{{ item.title }}</h3>
            <div class="cart-item-price">${{ item.price.toFixed(2) }}</div>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn" @click="decreaseQuantity(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button class="quantity-btn" @click="increaseQuantity(item)">+</button>
              </div>
              <button class="btn btn-danger" @click="removeFromCart(item.id)">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>
          <div class="cart-item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>
        
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${{ shippingCost.toFixed(2) }}</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total:</span>
            <span>${{ totalCost.toFixed(2) }}</span>
          </div>
          
          <button class="btn btn-primary checkout-btn" @click="checkout">
            <i class="fas fa-lock"></i> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartView',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal']),
    shippingCost() {
      return this.cart.length > 0 ? 5.99 : 0;
    },
    totalCost() {
      return this.cartTotal + this.shippingCost;
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateQuantity']),
    increaseQuantity(item) {
      this.updateQuantity({ id: item.id, quantity: item.quantity + 1 });
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateQuantity({ id: item.id, quantity: item.quantity - 1 });
      }
    },
    checkout() {
      if (this.cart.length > 0) {
        alert('Thank you for your purchase!');
        this.$store.state.cart = [];
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.btn-danger {
  background: var(--danger);
  color: white;
}
</style>