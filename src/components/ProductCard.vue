<template>
  <div class="product-cart-wrapper">
    <!-- ✅ Toast message -->
    <div v-if="showToast" class="toast-message">
      {{ toastText }}
    </div>

    <div class="product-cart-grid">
      <div v-for="product in products" :key="product.id" class="card">
        <img :src="product.images[product.colors[0]]" alt="Product Image" />
        <h3>{{ product.name }}</h3>
        <p><strong>Price:</strong> ₹{{ product.price }}</p>
        <div class="button-group">
          <button class="add-btn" @click="addToCart(product)">Add to 🛒</button>
          <button class="view-btn" @click="viewProduct(product.id)">View More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showToast: false,
      toastText: ''
    };
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
      this.toastText = `"${product.name}" added to cart!`;
      this.showToast = true;

      // Hide toast after 2.5 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    },
    viewProduct(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } });
    }
  }
};
</script>

<style scoped>
/* 🔥 TOAST STYLE BELOW NAVBAR */
.toast-message {
  position: fixed;
  top: 70px; /* Adjust based on your navbar height */
  left: 50%;
  transform: translateX(-50%);
  background-color: #1b1d1b;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  z-index: 1000;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeSlide 2.5s ease-in-out;
}

@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
}

.product-cart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.product-cart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.card {
  background: whitesmoke;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  color: black;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

p {
  margin: 0.25rem 0;
}

.button-group {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.add-btn,
.view-btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.add-btn {
  background-color: #1f1e1e;
  color: white;
}

.view-btn {
  background-color: white;
  color: black;
  border: 2px solid black;
}

.view-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .product-cart-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-cart-grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 1rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .add-btn,
  .view-btn {
    width: 100%;
  }
}
</style>
