import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import type { Product } from '../../data/products';
import { formatPrice } from '../../data/products';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isVinyl = product.category === 'vinyl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      style={{
        background: 'linear-gradient(145deg, rgba(44,26,14,0.9), rgba(26,10,4,0.95))',
        border: '1px solid rgba(212, 168, 71, 0.18)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).closest?.('[data-card]')?.setAttribute('style',
          'border-color: rgba(212,168,71,0.4); box-shadow: 0 12px 40px rgba(212,168,71,0.12);'
        );
      }}
    >
      {/* Card visual top */}
      <div
        style={{
          height: '140px',
          background: isVinyl
            ? 'radial-gradient(circle at 50% 50%, #3A3A3A 0%, #1A1A1A 40%, #0D0D0D 100%)'
            : 'linear-gradient(135deg, #2C1A0E 0%, #5C2E0A 50%, #C17A2E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isVinyl ? (
          /* Vinyl record visual */
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #1A1A1A 0deg, #2A2A2A 30deg, #1A1A1A 60deg, #2A2A2A 90deg, #1A1A1A 120deg, #2A2A2A 150deg, #1A1A1A 180deg, #2A2A2A 210deg, #1A1A1A 240deg, #2A2A2A 270deg, #1A1A1A 300deg, #2A2A2A 330deg, #1A1A1A 360deg)',
                boxShadow: '0 0 0 2px #333, 0 0 0 4px #1A1A1A, 0 0 20px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                ●
              </div>
            </motion.div>
          </div>
        ) : (
          /* Coffee visual */
          <div
            style={{
              fontSize: '64px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
            }}
          >
            {product.emoji}
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
              color: '#2C1A0E',
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '2px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Category tag */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(212,168,71,0.2)',
            color: '#8B7355',
            fontFamily: 'Space Mono, monospace',
            fontSize: '8px',
            padding: '2px 6px',
            borderRadius: '2px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {isVinyl ? 'Vinyl' : 'Coffee'}
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '8px',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '17px',
              fontWeight: 700,
              color: '#F5EDD8',
              marginBottom: '2px',
            }}
          >
            {product.name}
          </h3>
          {product.origin && (
            <p
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                color: '#C17A2E',
                letterSpacing: '0.05em',
              }}
            >
              📍 {product.origin}
            </p>
          )}
        </div>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#8B7355',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {product.description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid rgba(212,168,71,0.1)',
            marginTop: '4px',
          }}
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '16px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4A847, #C17A2E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {formatPrice(product.price)}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            style={{
              background: added
                ? 'linear-gradient(135deg, #2E7D32, #4CAF50)'
                : 'linear-gradient(135deg, #C17A2E, #D4A847)',
              border: 'none',
              borderRadius: '4px',
              padding: '9px 16px',
              color: '#2C1A0E',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.05em',
              transition: 'background 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {added ? (
              <>
                <Check size={13} />
                Đã thêm
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                Thêm vào giỏ
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
