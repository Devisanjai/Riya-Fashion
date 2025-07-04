<template>
  <div class="cart-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    <NavBar />

    <div class="cart-content">
      <h2>Your Shopping Cart</h2>

      <div v-if="cart.length">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td><img :src="item.images[item.colors[0]]" alt="Product Image" class="table-img" /></td>
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>₹{{ item.price }}</td>
              <td>₹{{ item.price * item.quantity }}</td>
              <td><button class="remove-button" @click="removeFromCart(item.id)">Remove</button></td>
            </tr>
          </tbody>
        </table>

        <div class="cart-summary">
          <p class="total-amount">Grand Total: ₹{{ totalAmount }}</p>
          <button class="cart-button" @click="goToPayment">Proceed to Checkout</button>
        </div>
      </div>

      <div v-else>
        <p class="empty-cart-message">Your cart is currently empty.</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.initThree();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
  },
  methods: {
    initThree() {
      const canvas = this.$refs.bgCanvas;

      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 300;

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.BufferGeometry();
      const particleCount = 600;
      const positions = [];

      for (let i = 0; i < particleCount; i++) {
        positions.push(
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600)
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 2,
        color: '#ffffff',
        transparent: true,
        opacity: 0.9
      });

      this.points = new THREE.Points(geometry, material);
      this.scene.add(this.points);

      this.animate();
    },
    pay() {
  // ...validation checks...

  this.$store.commit('clearCart');
  this.$router.push('/payment-success');
},
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      this.points.rotation.y += 0.001;
      this.points.rotation.x += 0.0005;
      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    goToPayment() {
      this.$router.push('/payment');
    },
    removeFromCart(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId);
    }
  }
};
</script>

<style scoped>
.cart-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: #0a0a0a;
  font-family: 'Poppins', sans-serif;
  padding: 6rem 2rem;
  position: relative;
  color: white;
}

.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.cart-content {
  position: relative;
  z-index: 1;
  max-width: 960px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.cart-content h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  overflow: hidden;
}

.cart-table th,
.cart-table td {
  padding: 1rem;
  text-align: center;
}

.cart-table th {
  background-color: rgba(255, 255, 255, 0.15);
  font-size: 1rem;
  font-weight: 600;
}

.cart-table td {
  font-size: 1rem;
  color: #ddd;
}

.table-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.remove-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.remove-button:hover {
  background-color: #e60000;
  transform: scale(1.05);
}

.cart-summary {
  margin-top: 3rem;
  text-align: right;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.cart-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart-button:hover {
  background-color: #dddddd;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.4rem;
  color: #ccc;
  margin-top: 4rem;
}
</style>
