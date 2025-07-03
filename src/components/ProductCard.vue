<template>
  <div class="product-card" :style="{ 'animation-delay': (index * 0.1) + 's' }">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-info">
      <div class="product-badge">{{ product.category }}</div>
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">${{ product.price.toFixed(2) }}</div>
      <div class="product-actions">
        <button class="btn btn-primary" @click="addToCart">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="btn-icon" :class="{ liked: isLiked }" @click="toggleLike">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  props: ['product', 'index'],
  computed: {
    isLiked() {
      return this.$store.getters.isInWishlist(this.product.id);
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.product);
      
      // Animation effect
      const card = this.$el;
      gsap.to(card, {
        duration: 0.3,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    },
    toggleLike() {
      this.$store.dispatch('toggleWishlist', this.product.id);
      if (!this.isLiked) {
        this.$store.dispatch('likeProduct', this.product.id);
      }
    }
  }
}
</script>