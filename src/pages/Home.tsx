import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Coffee, Disc3 } from 'lucide-react';

type Filter = 'all' | 'coffee' | 'vinyl';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = products.filter((p) =>
    filter === 'all' ? true : p.category === filter
  );

  return (
    <main>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #0D0500 0%, #1E0A02 30%, #2C1A0E 60%, #1A0A00 100%)',
        }}
      >
        {/* Background decorative rings */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '600px',
            height: '600px',
            opacity: 0.08,
          }}
        >
          {[600, 480, 360, 240, 120, 40].map((size, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                border: `2px solid #D4A847`,
              }}
            />
          ))}
        </div>

        {/* Rotating large vinyl in background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, #111 0deg, #1A1A1A 30deg, #0A0A0A 60deg, #222 90deg, #111 120deg, #1D1D1D 150deg, #0A0A0A 180deg, #1A1A1A 210deg, #111 240deg, #222 270deg, #111 300deg, #1D1D1D 330deg)',
            opacity: 0.4,
            boxShadow: '0 0 80px rgba(212,168,71,0.05)',
          }}
        />

        {/* Hero content */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 24px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  height: '1px',
                  width: '40px',
                  background: 'linear-gradient(90deg, transparent, #C17A2E)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#C17A2E',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                Est. 2024 · Hà Nội
              </span>
              <div
                style={{
                  height: '1px',
                  width: '40px',
                  background: 'linear-gradient(90deg, #C17A2E, transparent)',
                }}
              />
            </div>

            {/* Main headline */}
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(42px, 8vw, 80px)',
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: '12px',
                color: '#F5EDD8',
              }}
            >
              Cà Phê &amp;{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #D4A847 0%, #C17A2E 50%, #D4A847 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Đĩa Than
              </em>
            </h1>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                color: '#8B7355',
                maxWidth: '520px',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Nơi mỗi ngụm cà phê hòa quyện cùng rãnh nhạc analog. Thưởng thức{' '}
              <span style={{ color: '#C17A2E' }}>hương vị thủ công</span> và{' '}
              <span style={{ color: '#C17A2E' }}>âm thanh sống động</span> trong
              không gian retro ấm áp.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[
                { label: 'Món đồ uống', value: '3' },
                { label: 'Đĩa than', value: '3' },
                { label: 'Nguồn gốc', value: '4' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '36px',
                      fontWeight: 700,
                      color: '#D4A847',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '10px',
                      color: '#8B7355',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
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
              — Thực Đơn
            </p>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '32px',
                fontWeight: 700,
                color: '#F5EDD8',
              }}
            >
              Chọn Của Bạn
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              background: 'rgba(44,26,14,0.6)',
              border: '1px solid rgba(212,168,71,0.15)',
              borderRadius: '6px',
              padding: '4px',
            }}
          >
            {[
              { key: 'all', label: 'Tất cả', icon: null },
              { key: 'coffee', label: 'Cà phê', icon: <Coffee size={14} /> },
              { key: 'vinyl', label: 'Đĩa than', icon: <Disc3 size={14} /> },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setFilter(tab.key as Filter)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background:
                    filter === tab.key
                      ? 'linear-gradient(135deg, #C17A2E, #D4A847)'
                      : 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  color: filter === tab.key ? '#2C1A0E' : '#8B7355',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  fontWeight: filter === tab.key ? 700 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.05em',
                }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              color: '#5C2E0A',
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
            }}
          >
            Không có sản phẩm nào.
          </div>
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(212,168,71,0.1)',
          padding: '32px 24px',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <p
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: '#5C2E0A',
            letterSpacing: '0.1em',
          }}
        >
          © 2024 The Brew & Beat · Hà Nội · Tình yêu cà phê & âm nhạc
        </p>
      </footer>
    </main>
  );
};

export default Home;
