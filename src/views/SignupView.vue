<template>
  <div class="login-container">
    <div class="form-container">
      <div class="login-header">
        <div class="logo">
          <i class="fas fa-recycle"></i>
          <span>Vintage Finds</span>
        </div>
        <h1 class="page-title">Create Account</h1>
        <p class="subtitle">Join our community of vintage lovers</p>
      </div>

      <form @submit.prevent="signup">
        <div class="form-group">
          <label>Full Name</label>
          <input 
            v-model="name" 
            type="text" 
            class="form-control" 
            placeholder="Your full name" 
            required
          />
        </div>
        
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
            placeholder="Create a password" 
            required
          />
          <div class="password-hint">
            <span v-if="password.length > 0 && password.length < 6" class="weak">Weak password</span>
            <span v-if="password.length >= 6 && password.length < 10" class="medium">Medium password</span>
            <span v-if="password.length >= 10" class="strong">Strong password</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            class="form-control" 
            placeholder="Confirm your password" 
            required
          />
          <div v-if="passwordMismatch" class="error-text">
            Passwords don't match
          </div>
        </div>
        
        <div class="form-checkbox">
          <label>
            <input type="checkbox" v-model="termsAgreed" required /> 
            I agree to the <router-link to="/terms">Terms of Service</router-link> and <router-link to="/privacy">Privacy Policy</router-link>
          </label>
        </div>
        
        <button type="submit" class="btn btn-submit" :disabled="isSigningUp">
          <i class="fas fa-user-plus"></i> 
          {{ isSigningUp ? 'Creating account...' : 'Create Account' }}
        </button>
        
        <div v-if="successMessage" class="success-message">
          <i class="fas fa-check-circle"></i> {{ successMessage }}
        </div>
        
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </div>
        
        <div class="login-link">
          Already have an account? <router-link to="/login">Sign in</router-link>
        </div>
      </form>
      
      <div class="social-signup">
        <div class="divider">
          <span>Or sign up with</span>
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
      <img src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Vintage collection" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignupView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAgreed: false,
      isSigningUp: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    passwordMismatch() {
      return this.password && this.confirmPassword && this.password !== this.confirmPassword;
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    async signup() {
      // Reset messages
      this.errorMessage = '';
      this.successMessage = '';
      
      // Validate form
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
      
      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters';
        return;
      }
      
      if (!this.termsAgreed) {
        this.errorMessage = 'You must agree to the terms and conditions';
        return;
      }
      
      this.isSigningUp = true;
      
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        
        // Register user through Vuex
        await this.registerUser(userData);
        
        // Show success message
        this.successMessage = 'Account created successfully! Redirecting to login...';
        
        // Redirect to login after delay
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        this.errorMessage = error.message || 'Failed to create account. Please try again.';
      } finally {
        this.isSigningUp = false;
      }
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

.password-hint {
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.weak {
  color: var(--danger);
}

.medium {
  color: var(--warning);
}

.strong {
  color: var(--success);
}

.error-text {
  color: var(--danger);
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.form-checkbox {
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

.form-checkbox a {
  color: var(--primary);
  text-decoration: none;
}

.form-checkbox a:hover {
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

.success-message {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
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

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
}

.login-link a {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.social-signup {
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