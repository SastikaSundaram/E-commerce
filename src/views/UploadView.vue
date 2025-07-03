<template>
  <div>
    <h1 class="page-title">Sell Your Pre-loved Items</h1>
    <p class="subtitle">Give your items a second life and earn money in the process.</p>
    
    <div class="form-container">
      <form @submit.prevent="upload">
        <div class="form-group">
          <label>Item Title</label>
          <input v-model="title" class="form-control" placeholder="Vintage Leather Jacket" required />
        </div>
        
        <div class="form-group">
          <label>Price ($)</label>
          <input v-model="price" type="number" class="form-control" placeholder="45.99" min="1" step="0.01" required />
        </div>
        
        <div class="form-group">
          <label>Category</label>
          <select v-model="category" class="form-control" required>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="description" class="form-control" placeholder="Describe your item in detail..." required></textarea>
        </div>
        
        <div class="form-group">
          <label>Image URL</label>
          <input v-model="image" class="form-control" placeholder="https://example.com/image.jpg" required />
          <div class="image-preview mt-2" v-if="image">
            <img :src="image" alt="Preview" style="max-width: 100%; border-radius: 8px; max-height: 200px;" />
          </div>
        </div>
        
        <button type="submit" class="btn btn-submit" :disabled="isSubmitting">
          <i class="fas fa-upload"></i> 
          {{ isSubmitting ? 'Uploading...' : 'List Item for Sale' }}
        </button>
        
        <div v-if="uploadSuccess" class="success-message">
          <i class="fas fa-check-circle"></i>
          Product uploaded successfully! It will be visible after admin approval.
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadView',
  data() {
    return {
      title: '',
      price: '',
      description: '',
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80',
      categories: ['Clothing', 'Electronics', 'Furniture', 'Home Decor', 'Books', 'Collectibles'],
      isSubmitting: false,
      uploadSuccess: false
    };
  },
  methods: {
    upload() {
      this.isSubmitting = true;
      
      const product = {
        title: this.title,
        price: parseFloat(this.price),
        description: this.description,
        category: this.category,
        image: this.image
      };
      
      this.$store.dispatch('uploadProduct', product);
      this.uploadSuccess = true;
      this.resetForm();
      this.isSubmitting = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.uploadSuccess = false;
      }, 5000);
    },
    resetForm() {
      this.title = '';
      this.price = '';
      this.description = '';
      this.category = 'Clothing';
    }
  }
}
</script>