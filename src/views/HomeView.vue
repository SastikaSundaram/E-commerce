<template>
  <div>
    <h1 class="page-title">Discover Unique Vintage Treasures</h1>
    <p class="subtitle">Find one-of-a-kind items with history and character. Each piece tells a story.</p>
    
    <div class="products-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'HomeView',
  components: { ProductCard },
  computed: {
    ...mapState(['products'])
  }
}
</script>