<!-- PaymentSuccess.vue -->
<template>
  <div class="success-wrapper">
    <h2>✅ Payment Successful</h2>
    <p>Thank you for your purchase!</p>
    <button @click="$router.push('/main')">Go to Home</button>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess"
};
</script>

<style scoped>
.success-wrapper {
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

button {
  padding: 0.8rem 1.5rem;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
