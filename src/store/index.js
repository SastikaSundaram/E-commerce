import { createStore } from 'vuex';

// Sample users
const users = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
    isAdmin: true,
    avatar: "JD"
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    isAdmin: false,
    avatar: "JS"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    password: "password123",
    isAdmin: false,
    avatar: "EW"
  }
];

// Sample products data
const sampleProducts = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Genuine leather jacket from the 90s in excellent condition. Perfect for any occasion.",
    category: "Clothing",
    status: "approved",
    likes: 10,
    owner: "Jane Doe"
  },
  {
    id: 2,
    title: "Retro Record Player",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Vintage record player with warm sound quality. Fully functional and tested.",
    category: "Electronics",
    status: "approved",
    likes: 5,
    owner: "Jane Doe"
  },
  {
    id: 3,
    title: "Antique Wooden Chair",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Beautifully crafted wooden chair from the early 20th century. Solid construction.",
    category: "Furniture",
    status: "approved",
    likes: 7,
    owner: "John Smith"
  },
  {
    id: 4,
    title: "Classic Polaroid Camera",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Vintage Polaroid camera with original case. Includes film cartridges.",
    category: "Electronics",
    status: "approved",
    likes: 12,
    owner: "Jane Doe"
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
    status: "pending",
    likes: 0,
    owner: "Jane Doe"
  },
  {
    id: 6,
    title: "Mid-century Modern Lamp",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
    description: "Elegant mid-century modern table lamp with brass accents. Fully functional.",
    category: "Home Decor",
    status: "pending",
    likes: 0,
    owner: "John Smith"
  }
];

export default createStore({
  state: {
    user: null, 
    currentUser: null,
    users: users,
    products: [...sampleProducts],
    userProducts: [...sampleProducts.filter(p => p.owner === "Jane Doe")],
    pendingApprovals: [...pendingProducts],
    cart: [],
    wishlist: [],
    email: ''
  },
  mutations: {
    LOGIN(state, user) {
      state.currentUser = user;
    },
    LOGOUT(state) {
      state.currentUser = null;
    },
    REGISTER_USER(state, user) {
      // Generate a unique ID for the new user
      const newId = Math.max(0, ...state.users.map(u => u.id)) + 1;
      
      // Create new user object
      const newUser = {
        id: newId,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: false,
        avatar: user.name.split(' ').map(n => n[0]).join('')
      };
      
      // Add to users array
      state.users.push(newUser);
    },
    ADD_PRODUCT(state, product) {
      const newProduct = {
        ...product,
        id: Date.now(),
        status: "pending",
        likes: 0,
        owner: state.currentUser.name
      };
      state.pendingApprovals.push(newProduct);
      state.userProducts.push(newProduct);
    },
    APPROVE_PRODUCT(state, id) {
      const index = state.pendingApprovals.findIndex(p => p.id === id);
      if (index !== -1) {
        const product = { ...state.pendingApprovals[index] };
        product.status = "approved";
        state.products.push(product);
        state.pendingApprovals.splice(index, 1);
      }
    },
    ADD_TO_CART(state, product) {
      const existing = state.cart.find(p => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter(item => item.id !== id);
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    TOGGLE_WISHLIST(state, productId) {
      const index = state.wishlist.indexOf(productId);
      if (index === -1) {
        state.wishlist.push(productId);
      } else {
        state.wishlist.splice(index, 1);
      }
    },
    LIKE_PRODUCT(state, productId) {
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.likes += 1;
      }
    },
    SET_EMAIL(state, email) {
      state.email = email;
    }
  },
  actions: {
    login({ commit }, credentials) {
      const user = this.state.users.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        commit('LOGIN', user);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    registerUser({ commit, state }, userData) {
      return new Promise((resolve, reject) => {
        // Check if email already exists
        const emailExists = state.users.some(u => u.email === userData.email);
        
        if (emailExists) {
          reject(new Error('Email already registered'));
          return;
        }
        
        // Register the user
        commit('REGISTER_USER', userData);
        resolve();
      });
    },
    uploadProduct({ commit }, product) {
      commit('ADD_PRODUCT', product);
    },
    approveProduct({ commit }, id) {
      commit('APPROVE_PRODUCT', id);
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id);
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload);
    },
    toggleWishlist({ commit }, productId) {
      commit('TOGGLE_WISHLIST', productId);
    },
    likeProduct({ commit }, productId) {
      commit('LIKE_PRODUCT', productId);
    },
    setEmail({ commit }, email) {
      commit('SET_EMAIL', email);
    }
  },
  getters: {
    isAuthenticated: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    approvedProducts: state => state.products.filter(p => p.status === 'approved'),
    pendingProducts: state => state.pendingApprovals,
    cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0),
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    isInWishlist: state => productId => state.wishlist.includes(productId)
  }
});