import { useState } from 'react'
import './index.css'
import Header from './components/layout/Header'
import CartDrawer from './components/layout/CartDrawer'
import Home from './pages/Home'
import Checkout from './pages/Checkout'

type Page = 'home' | 'checkout'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0D0500' }}>
      <Header currentPage={currentPage} onNavigate={navigate} />

      <CartDrawer onCheckout={() => navigate('checkout')} />

      {currentPage === 'home' ? (
        <Home />
      ) : (
        <Checkout onBack={() => navigate('home')} />
      )}
    </div>
  )
}

export default App
