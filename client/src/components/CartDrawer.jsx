import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { cart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container-lowest z-50 flex flex-col animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined material-symbols-filled text-primary">shopping_bag</span>
            <h2 className="font-serif font-semibold text-headline-lg-mobile text-primary">Your Basket</h2>
            {totalItems > 0 && (
              <span className="bg-secondary text-white text-label-sm px-2.5 py-0.5 rounded-full font-sans font-semibold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="material-symbols-outlined text-[72px] text-outline">shopping_basket</span>
              <p className="font-serif text-headline-lg-mobile text-on-surface-variant">Your basket is empty</p>
              <p className="font-sans text-body-md text-on-surface-variant">Add some fresh organic goodness!</p>
              <button
                onClick={onClose}
                className="mt-2 bg-primary text-white px-8 py-3 rounded-full font-sans font-semibold hover:bg-secondary transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-surface-container-low rounded-2xl p-4 group">
                <Link to={`/products/${item.id}`} onClick={onClose}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <Link to={`/products/${item.id}`} onClick={onClose}>
                      <h4 className="font-serif font-semibold text-primary text-body-md leading-tight hover:text-secondary transition-colors truncate pr-2">
                        {item.name}
                      </h4>
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-outline hover:text-error transition-colors shrink-0 p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">
                    {item.weight} • {item.label}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 bg-surface-container rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="font-sans font-semibold text-body-md text-primary w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    <span className="font-sans font-bold text-primary text-body-md">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-outline-variant/20 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-body-lg text-on-surface-variant">Subtotal</span>
              <span className="font-serif font-bold text-headline-lg-mobile text-primary">₹{totalPrice}</span>
            </div>
            <p className="text-label-sm text-on-surface-variant text-center">
              🌿 Free delivery on orders above ₹999
            </p>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full bg-primary text-white text-center py-4 rounded-full font-sans font-semibold hover:bg-secondary transition-colors shadow-xl active:scale-95"
            >
              View Cart & Checkout
            </Link>
            <button
              onClick={onClose}
              className="block w-full text-center py-2 text-secondary font-sans font-semibold hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
