<template>
  <div>
    <StoreNavbar />
    <Navbar />
    <div class="page-container">
      <router-view v-slot="{ Component }">
        <transition name="slide-up" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Vintage Finds</h3>
          <p>Your premier destination for unique second-hand treasures. We believe in sustainable fashion and giving pre-loved items a new life.</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#"><i class="fas fa-chevron-right"></i> Home</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Shop</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Sell Item</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> About Us</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Contact Us</h3>
          <ul class="footer-links">
            <li><a href="#"><i class="fas fa-map-marker-alt"></i> 123 Thrift Street, Eco City</a></li>
            <li><a href="#"><i class="fas fa-phone"></i> (555) 123-4567</a></li>
            <li><a href="#"><i class="fas fa-envelope"></i> hello@vintagefinds.com</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers, free giveaways, and sustainable living tips.</p>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Your Email Address">
          </div>
          <button class="btn btn-primary">Subscribe</button>
        </div>
      </div>
      
      <div class="copyright">
        &copy; 2023 Vintage Finds. All rights reserved. Designed with ♥ for sustainable fashion.
      </div>
    </footer>
  </div>
</template>

<script>
import StoreNavbar from './components/StoreNavbar.vue';

export default {
  components: { StoreNavbar }
}
</script>