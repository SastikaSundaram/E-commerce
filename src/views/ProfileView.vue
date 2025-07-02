<template>
  <div>
    <h1 class="page-title">Your Listed Items</h1>
    <p class="subtitle">Manage your products and track their status.</p>
    
    <div class="products-grid">
      <ProductCard v-for="item in userProducts" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProfileView',
  components: { ProductCard },
  computed: {
    ...mapState(['userProducts'])
  }
}
</script>