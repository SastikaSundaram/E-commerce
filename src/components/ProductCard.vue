<template>
  <div class="product-card pulse">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-info">
      <div class="product-badge">{{ product.category }}</div>
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">${{ product.price.toFixed(2) }}</div>
      <div class="product-actions">
        <button class="btn btn-primary">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="btn-icon">
          <i class="far fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';  // Add this import

export default {
  props: ['product'],
  mounted() {
    gsap.from(this.$el, {  // Use imported gsap
      duration: 0.5,
      opacity: 0,
      y: 20,
      delay: this.$vnode.key * 0.1
    });
  }
}
</script>