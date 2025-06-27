import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import MainPage from '../views/MainPage.vue';
import ProductsPage from '../components/ProductsPage.vue';
import CartPage from '../components/CartPage.vue';
import ProductDetail from '../components/ProductDetail.vue';
import PaymentPage from '../components/PaymentPage.vue';
import ProductCard from '@/components/ProductCard.vue';
// import HomePage from '../components/HomePage.vue';




const routes = [
  { path: '/', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/products', component: ProductsPage },
  { path: '/cart', component: CartPage },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/payment', component: PaymentPage },
  {path: '/product-card', component: ProductCard },
  {
  path: '/product/:id',
  name: 'ProductDetail',
  component: () => import('@/components/ProductDetail.vue')
}

  // { path: '/home', component: HomePage },
];

export default createRouter({
  history: createWebHistory(),
  routes
});


  
