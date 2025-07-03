<template>
  <div>
    <h1 class="page-title">Admin Dashboard</h1>
    <p class="subtitle">Review and approve new product listings.</p>
    
    <div class="admin-panel">
      <h2>Pending Approvals</h2>
      
      <div v-if="pendingApprovals.length === 0" class="empty-state">
        <i class="fas fa-check-circle"></i>
        <p>No pending approvals at this time.</p>
      </div>
      
      <table v-else class="admin-table">
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

<style scoped>
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--success);
}
</style>