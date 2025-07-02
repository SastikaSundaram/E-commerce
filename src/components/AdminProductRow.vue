<template>
  <tr>
    <td>
      <img :src="product.image" :alt="product.title" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
    </td>
    <td>{{ product.title }}</td>
    <td>{{ product.category }}</td>
    <td>${{ product.price.toFixed(2) }}</td>
    <td>
      <span class="status-badge status-pending">Pending</span>
    </td>
    <td>
      <button class="btn btn-primary" @click="$emit('approve', product.id)">
        <i class="fas fa-check"></i> Approve
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['product']
}
</script>