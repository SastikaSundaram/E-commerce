<template>
  <div>
    <h1 class="page-title">Admin Dashboard</h1>
    <p class="subtitle">Review and approve new product listings.</p>
    
    <div class="admin-panel">
      <h2>Pending Approvals</h2>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AdminProductRow 
            v-for="item in pendingApprovals" 
            :key="item.id" 
            :product="item"
            @approve="approveProduct"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AdminProductRow from '@/components/AdminProductRow.vue';

export default {
  name: 'AdminView', 
  components: { AdminProductRow },
  computed: {
    ...mapState(['pendingApprovals'])
  },
  methods: {
    approveProduct(id) {
      this.$store.dispatch('approveProduct', id);
    }
  }
}
</script>