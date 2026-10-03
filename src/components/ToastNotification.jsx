import React from 'react';
import { useStore } from '../context/StoreContext';

export default function ToastNotification() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div
      className="toast-anim"
      style={{
        position: 'fixed',
        top: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        backgroundColor: '#010000',
        border: '2px solid #dc143c',
        borderRadius: '9999px',
        padding: '10px 24px',
        boxShadow: '0 0 25px rgba(220, 20, 60, 0.6), 3px 3px 0px #d4af37',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#ffffff',
        fontSize: '0.84rem',
        fontWeight: '900',
        letterSpacing: '0.04em'
      }}
    >
      <span>{toast.message}</span>
    </div>
  );
}
