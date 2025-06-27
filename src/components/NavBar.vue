<template>
  <nav class="navbar">
    <div class="nav-left">
      <span class="logo" @click="$router.push('/main')">RIYA</span>
    </div>

    <div class="nav-center">
      <span class="username">Welcome {{ user }}</span>
    </div>

    <div class="nav-right">
      <button @click="$router.push('/main')">Home</button>
      <button @click="$router.push('/products')">Product</button>
      <button @click="$router.push('/cart')">Cart ({{ cartCount }})</button>
    </div>
  </nav>
</template>



<script>
export default {
   methods: {
    goToMain() {
      this.$router.push('/main');
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.navbar {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-left,
.nav-center,
.nav-right {
  flex: 1;
  display: flex;
  align-items: center;
  color: #101010;
}

.nav-left {
  justify-content: flex-start;
}

.nav-center {
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  flex: 2;
  padding-left: 2rem;
  padding-right: 2rem;
  transition: color 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;

}

.nav-right {
  justify-content: flex-end;
  gap: 1rem;
  font-size: 0.9rem;
  color: #f1f1f1;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-right: 1rem;
  position: relative;
  transition: color 0.3s ease;
  margin-right: 2rem;
}

.logo {
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
}

.username {
  font-weight: 500;
  color: #f1f1f1;
  font-size: 1rem;
}

button {
  background-color: #f3ebef;
  border: none;
  color: rgb(16, 16, 16);
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}


</style>
