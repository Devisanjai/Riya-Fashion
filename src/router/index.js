import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import MainPage from '../views/MainPage.vue'
import ProductsPage from '../components/ProductsPage.vue'
import CartPage from '../components/CartPage.vue'
import ProductDetail from '../components/ProductDetail.vue'
import PaymentPage from '../components/PaymentPage.vue'
import ProductCard from '@/components/ProductCard.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/products', component: ProductsPage },
  { path: '/cart', component: CartPage },
  { 
    path: '/product/:id', 
    name: 'ProductDetail', 
    component: ProductDetail,
    props: true 
  },
  { path: '/payment', component: PaymentPage },
  { path: '/product-card', component: ProductCard },
  {
  path: '/payment-success',
  name: 'PaymentSuccess',
  component: () => import('../components/PaymentSucces.vue')
}
]


export default createRouter({
  history: createWebHashHistory('/Riya-Fashion/'),
  routes
})