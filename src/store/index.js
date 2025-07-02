import { createStore } from 'vuex';

// Sample products data
const sampleProducts = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Genuine leather jacket from the 90s in excellent condition. Perfect for any occasion.",
    category: "Clothing",
    status: "approved"
  },
  {
    id: 2,
    title: "Retro Record Player",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Vintage record player with warm sound quality. Fully functional and tested.",
    category: "Electronics",
    status: "approved"
  },
  {
    id: 3,
    title: "Antique Wooden Chair",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Beautifully crafted wooden chair from the early 20th century. Solid construction.",
    category: "Furniture",
    status: "approved"
  },
  {
    id: 4,
    title: "Classic Polaroid Camera",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Vintage Polaroid camera with original case. Includes film cartridges.",
    category: "Electronics",
    status: "approved"
  }
];

const pendingProducts = [
  {
    id: 5,
    title: "Handwoven Persian Rug",
    price: 220.00,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Authentic handwoven Persian rug with intricate patterns. Excellent condition.",
    category: "Home Decor",
    status: "pending"
  },
  {
    id: 6,
    title: "Mid-century Modern Lamp",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Elegant mid-century modern table lamp with brass accents. Fully functional.",
    category: "Home Decor",
    status: "pending"
  }
];

export default createStore({
  state() {
    return {
      products: sampleProducts,
      userProducts: [
        sampleProducts[0],
        sampleProducts[2]
      ],
      pendingApprovals: pendingProducts,
      user: {
        name: "Jane Doe",
        email: "jane@example.com",
        isAdmin: true
      }
    };
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      product.status = "pending";
      state.pendingApprovals.push(product);
    },
    APPROVE_PRODUCT(state, id) {
      const item = state.pendingApprovals.find(p => p.id === id);
      if (item) {
        item.status = "approved";
        state.products.push(item);
        state.pendingApprovals = state.pendingApprovals.filter(p => p.id !== id);
      }
    },
    ADD_USER_PRODUCT(state, product) {
      state.userProducts.push(product);
    }
  },
  actions: {
    uploadProduct({ commit }, product) {
      commit('ADD_PRODUCT', product);
      commit('ADD_USER_PRODUCT', product);
    },
    approveProduct({ commit }, id) {
      commit('APPROVE_PRODUCT', id);
    }
  },
  getters: {
    approvedProducts: state => state.products.filter(p => p.status === 'approved'),
    pendingProducts: state => state.pendingApprovals
  }
});