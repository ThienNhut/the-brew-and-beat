import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../data/products';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: 'cash' | 'transfer';
}

const generateOrderId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'BB-';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: 'cash',
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(generateOrderId);

  const total = totalPrice();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 0 40px rgba(212,168,71,0.3)',
            }}
          >
            <CheckCircle size={40} color="#2C1A0E" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#F5EDD8',
              marginBottom: '12px',
            }}
          >
            Đặt hàng thành công!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#8B7355',
              fontSize: '15px',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            Chúng tôi sẽ liên hệ xác nhận trong vài phút. Cảm ơn bạn đã tin tưởng
            The Brew &amp; Beat! ☕🎵
          </motion.p>

          {/* Order ID card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(212,168,71,0.06)',
              border: '1px solid rgba(212,168,71,0.25)',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
              <Package size={18} color="#C17A2E" />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Mã đơn hàng
              </span>
            </div>
            <div
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #D4A847, #C17A2E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
              }}
            >
              {orderId}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            style={{
              background: 'linear-gradient(135deg, #C17A2E, #D4A847)',
              border: 'none',
              borderRadius: '4px',
              padding: '13px 32px',
              color: '#2C1A0E',
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            ← Về trang chủ
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'start',
      }}
      className="checkout-grid"
    >
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#8B7355',
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '32px',
            letterSpacing: '0.05em',
            padding: 0,
          }}
        >
          <ArrowLeft size={14} />
          Quay lại thực đơn
        </button>

        <p
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#C17A2E',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          — Thanh Toán
        </p>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '32px',
            fontWeight: 700,
            color: '#F5EDD8',
            marginBottom: '32px',
          }}
        >
          Thông Tin Đơn Hàng
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          >
            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Họ và tên *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="input-field"
                style={{ padding: '12px 14px', fontSize: '14px', width: '100%' }}
              />
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Số điện thoại *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="0912 345 678"
                className="input-field"
                style={{ padding: '12px 14px', fontSize: '14px', width: '100%' }}
              />
            </div>

            {/* Email */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                gridColumn: '1 / -1',
              }}
            >
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="input-field"
                style={{ padding: '12px 14px', fontSize: '14px', width: '100%' }}
              />
            </div>

            {/* Address */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                gridColumn: '1 / -1',
              }}
            >
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Địa chỉ giao hàng *
              </label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                className="input-field"
                style={{ padding: '12px 14px', fontSize: '14px', width: '100%' }}
              />
            </div>

            {/* Note */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                gridColumn: '1 / -1',
              }}
            >
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Ghi chú
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Yêu cầu đặc biệt, ít đường, không đá..."
                rows={3}
                className="input-field"
                style={{
                  padding: '12px 14px',
                  fontSize: '14px',
                  width: '100%',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Payment method */}
            <div
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <label
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Phương thức thanh toán
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { value: 'cash', label: '💵 Tiền mặt khi nhận' },
                  { value: 'transfer', label: '🏦 Chuyển khoản' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      borderRadius: '4px',
                      border: `1px solid ${form.paymentMethod === opt.value ? 'rgba(212,168,71,0.5)' : 'rgba(212,168,71,0.15)'}`,
                      background:
                        form.paymentMethod === opt.value
                          ? 'rgba(212,168,71,0.1)'
                          : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: form.paymentMethod === opt.value ? '#D4A847' : '#8B7355',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={form.paymentMethod === opt.value}
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMethod: opt.value as 'cash' | 'transfer',
                        }))
                      }
                      style={{ accentColor: '#D4A847' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={items.length === 0}
            style={{
              marginTop: '28px',
              width: '100%',
              padding: '16px',
              background:
                items.length === 0
                  ? 'rgba(212,168,71,0.2)'
                  : 'linear-gradient(135deg, #C17A2E, #D4A847)',
              border: 'none',
              borderRadius: '4px',
              color: items.length === 0 ? '#5C2E0A' : '#2C1A0E',
              fontFamily: 'Space Mono, monospace',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: items.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow:
                items.length > 0 ? '0 4px 24px rgba(212,168,71,0.25)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {items.length === 0 ? 'Giỏ hàng trống' : `Xác nhận đặt hàng · ${formatPrice(total)}`}
          </motion.button>
        </form>
      </motion.div>

      {/* Order summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: 'sticky',
          top: '96px',
          background: 'rgba(44,26,14,0.5)',
          border: '1px solid rgba(212,168,71,0.18)',
          borderRadius: '8px',
          padding: '24px',
        }}
      >
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#F5EDD8',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid rgba(212,168,71,0.12)',
          }}
        >
          Tóm tắt đơn hàng
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {items.length === 0 ? (
            <p
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                color: '#5C2E0A',
                textAlign: 'center',
                padding: '20px 0',
              }}
            >
              Chưa có món nào
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '18px' }}>{item.product.emoji}</span>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#F5EDD8',
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
                        fontSize: '11px',
                        color: '#8B7355',
                      }}
                    >
                      × {item.quantity}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '13px',
                    color: '#D4A847',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(212,168,71,0.15)',
            paddingTop: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                color: '#8B7355',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Tổng cộng
            </span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '24px',
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
          <p
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#5C2E0A',
              marginTop: '8px',
              letterSpacing: '0.05em',
            }}
          >
            * Phí giao hàng tính riêng
          </p>
        </div>

        {/* Order ID preview */}
        <div
          style={{
            marginTop: '20px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '4px',
            padding: '12px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#5C2E0A',
              letterSpacing: '0.1em',
              marginBottom: '4px',
            }}
          >
            MÃ ĐƠN DỰ KIẾN
          </p>
          <p
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '16px',
              color: '#8B7355',
              letterSpacing: '0.1em',
            }}
          >
            {orderId}
          </p>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
