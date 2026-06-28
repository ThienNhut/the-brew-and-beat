import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../data/products';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 5, 2, 0.75)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '420px',
              maxWidth: '95vw',
              background: '#1E0E06',
              borderLeft: '1px solid rgba(212, 168, 71, 0.25)',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid rgba(212, 168, 71, 0.15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#F5EDD8',
                  }}
                >
                  Giỏ Hàng
                </h2>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    color: '#8B7355',
                    marginTop: '2px',
                  }}
                >
                  {items.length === 0
                    ? 'Chưa có gì trong giỏ'
                    : `${items.reduce((s, i) => s + i.quantity, 0)} món`}
                </p>
              </div>
              <button
                onClick={closeCart}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,168,71,0.2)',
                  borderRadius: '4px',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#8B7355',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {items.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '16px',
                    color: '#8B7355',
                  }}
                >
                  <ShoppingBag size={56} strokeWidth={1} />
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '18px',
                      color: '#5C2E0A',
                    }}
                  >
                    Giỏ hàng trống
                  </div>
                  <p
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      textAlign: 'center',
                      lineHeight: 1.6,
                    }}
                  >
                    Chọn một ly cà phê & một đĩa nhạc
                    <br />
                    để bắt đầu hành trình.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        style={{
                          background: 'rgba(212, 168, 71, 0.06)',
                          border: '1px solid rgba(212, 168, 71, 0.15)',
                          borderRadius: '6px',
                          padding: '14px',
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '28px',
                            lineHeight: 1,
                            minWidth: '40px',
                            textAlign: 'center',
                          }}
                        >
                          {item.product.emoji}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontFamily: 'Playfair Display, serif',
                              fontSize: '15px',
                              color: '#F5EDD8',
                              marginBottom: '4px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.product.name}
                          </p>
                          <p
                            style={{
                              fontFamily: 'Space Mono, monospace',
                              fontSize: '12px',
                              color: '#D4A847',
                            }}
                          >
                            {formatPrice(item.product.price)}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginTop: '8px',
                            }}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              style={{
                                width: '24px',
                                height: '24px',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(212,168,71,0.2)',
                                borderRadius: '3px',
                                color: '#D4A847',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              style={{
                                fontFamily: 'Space Mono, monospace',
                                fontSize: '13px',
                                color: '#F5EDD8',
                                minWidth: '20px',
                                textAlign: 'center',
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              style={{
                                width: '24px',
                                height: '24px',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(212,168,71,0.2)',
                                borderRadius: '3px',
                                color: '#D4A847',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                          <p
                            style={{
                              fontFamily: 'Space Mono, monospace',
                              fontSize: '13px',
                              color: '#F5EDD8',
                              fontWeight: 700,
                            }}
                          >
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#5C2E0A',
                              padding: '2px',
                              transition: 'color 0.2s ease',
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: '24px',
                  borderTop: '1px solid rgba(212, 168, 71, 0.15)',
                  background: 'rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '12px',
                      color: '#8B7355',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Tổng cộng
                  </span>
                  <span
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '22px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #D4A847, #C17A2E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    closeCart();
                    onCheckout();
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#2C1A0E',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(212,168,71,0.25)',
                  }}
                >
                  Thanh Toán →
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
