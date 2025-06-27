<template>
  <div class="product-cart-wrapper">
    <div class="product-cart-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="card"
      >
        <img :src="product.images[product.colors[0]]" alt="Product Image" />
        <h3>{{ product.name }}</h3>
        <!-- <p>{{ product.description }}</p> -->
        <p><strong>Price:</strong> ₹{{ product.price }}</p>
        <div class="button-group">
          <button class="add-btn" @click="addToCart(product)">Add to Cart</button>
          <button class="view-btn" @click="viewProduct(product.id)">View</button>
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
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
    },
    viewProduct(id) {
      this.$router.push({ name: 'ProductDetail', params: { id } });
    }
  }
};
</script>




<style scoped>
.product-cart-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  /* background: linear-gradient(145deg, #a18cd1, #fbc2eb); */
}

.product-cart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
}

.card {
  background: whitesmoke;
  padding: 1.5rem;
  border-radius: 0px;
  text-align: center;
  color: black; 
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 300px;
  backdrop-filter: blur(12px); 
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}
.add-btn {
  background-color: #151415;
  color: white;
}

.view-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.view-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
</style>
