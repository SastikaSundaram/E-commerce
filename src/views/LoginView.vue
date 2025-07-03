<template>
  <div class="login-container">
    <div class="form-container">
      <div class="login-header">
        <div class="logo">
          <i class="fas fa-recycle"></i>
          <span>Vintage Finds</span>
        </div>
        <h1 class="page-title">Welcome Back</h1>
        <p class="subtitle">Sign in to your account</p>
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="your.email@example.com" 
            required
          />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="Enter your password" 
            required
          />
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" /> Remember me
          </label>
          <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
        </div>
        
        <button type="submit" class="btn btn-submit" :disabled="isLoggingIn">
          <i class="fas fa-sign-in-alt"></i> 
          {{ isLoggingIn ? 'Signing in...' : 'Sign In' }}
        </button>
        
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </div>
        
        <div class="signup-link">
          Don't have an account? <router-link to="/signup">Sign up</router-link>
        </div>
      </form>
      
      <div class="social-login">
        <div class="divider">
          <span>Or sign in with</span>
        </div>
        <div class="social-buttons">
          <button class="btn-social google">
            <i class="fab fa-google"></i> Google
          </button>
          <button class="btn-social facebook">
            <i class="fab fa-facebook-f"></i> Facebook
          </button>
        </div>
      </div>
    </div>
    
    <div class="login-image">
      <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Vintage items" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      isLoggingIn: false,
      errorMessage: ''
    };
  },
  methods: {
    login() {
      this.isLoggingIn = true;
      this.errorMessage = '';
      
      // Simulate API call
      setTimeout(() => {
        const users = this.$store.state.users;
        const user = users.find(u => u.email === this.email && u.password === this.password);
        
        if (user) {
          this.$store.commit('LOGIN', user);
          this.$router.push('/profile');
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
        
        this.isLoggingIn = false;
      }, 1000);
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: calc(100vh - 200px);
  align-items: center;
}

.form-container {
  flex: 1;
  max-width: 500px;
  background: white;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: var(--shadow);
  margin: 0 auto;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.logo i {
  color: var(--secondary);
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--gray);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.forgot-password {
  font-size: 0.9rem;
  color: var(--primary);
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn-submit {
  background: var(--primary);
  color: white;
  font-size: 1.1rem;
  padding: 1rem;
  width: 100%;
  margin-top: 0.5rem;
}

.error-message {
  background: #ffebee;
  color: var(--danger);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
}

.signup-link a {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.social-login {
  margin-top: 2rem;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

.social-buttons {
  display: flex;
  gap: 1rem;
}

.btn-social {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--transition);
}

.btn-social.google {
  background: #fff;
  color: #757575;
  border: 1px solid #ddd;
}

.btn-social.google:hover {
  background: #f5f5f5;
}

.btn-social.facebook {
  background: #3b5998;
  color: white;
}

.btn-social.facebook:hover {
  background: #344e86;
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  display: none;
}

.login-image img {
  max-width: 100%;
  border-radius: 15px;
  box-shadow: var(--shadow);
}

@media (min-width: 992px) {
  .login-container {
    gap: 4rem;
  }
  
  .login-image {
    display: flex;
  }
}
</style>