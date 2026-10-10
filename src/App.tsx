import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { lazyWithRetry as P } from './lib/lazyWithRetry'
const Home = P(() => import('./pages/Home'))
const Products = P(() => import('./pages/Products'))
const ProductDetail = P(() => import('./pages/ProductDetail'))
const Services = P(() => import('./pages/Services'))
const ServiceDetail = P(() => import('./pages/ServiceDetail'))
const Blog = P(() => import('./pages/Blog'))
const BlogPost = P(() => import('./pages/BlogPost'))
const About = P(() => import('./pages/About'))
const Contact = P(() => import('./pages/Contact'))
const Legal = P(() => import('./pages/Legal'))
const NotFound = P(() => import('./pages/NotFound'))
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal kind="privacy" />} />
        <Route path="terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
