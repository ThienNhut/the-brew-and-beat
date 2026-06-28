import React from 'react';
import { ShoppingCart, Music, Coffee } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: 'home' | 'checkout';
  onNavigate: (page: 'home' | 'checkout') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  return (
    <header
      style={{
        background: 'rgba(26, 10, 4, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 168, 71, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
              padding: '6px 10px',
              borderRadius: '4px',
            }}
          >
            <Coffee size={16} color="#2C1A0E" />
            <span style={{ color: '#2C1A0E', fontSize: '10px', fontWeight: 700, fontFamily: 'Space Mono, monospace' }}>×</span>
            <Music size={16} color="#2C1A0E" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #D4A847, #C17A2E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
              }}
            >
              The Brew & Beat
            </div>
            <div
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                color: '#8B7355',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Cà phê · Đĩa than
            </div>
          </div>
        </button>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['home', 'checkout'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page as 'home' | 'checkout')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: currentPage === page ? '#D4A847' : '#8B7355',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '4px 0',
              }}
            >
              {page === 'home' ? 'Thực đơn' : 'Thanh toán'}
              {currentPage === page && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #C17A2E, #D4A847)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </button>
          ))}

          {/* Cart button */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#2C1A0E',
            }}
          >
            <ShoppingCart size={18} />
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              Giỏ hàng
            </span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#B84444',
                    color: '#FAF6EE',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: 700,
                    border: '2px solid #1A1A1A',
                  }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
