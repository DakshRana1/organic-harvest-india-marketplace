import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

  const delivery = totalPrice >= 999 ? 0 : 79;
  const grandTotal = totalPrice + delivery;

  if (cart.length === 0) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center px-4">
        <span className="material-symbols-outlined text-[96px] text-outline mb-6 block">shopping_basket</span>
        <h1 className="font-serif text-headline-lg text-primary mb-3">Your basket is empty</h1>
        <p className="font-sans text-body-lg text-on-surface-variant mb-8">Add some fresh organic goodness to get started!</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-sans font-semibold hover:bg-secondary transition-colors shadow-xl">
          <span className="material-symbols-outlined text-[20px]">storefront</span>
          Start Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <span className="text-secondary-fixed text-label-sm uppercase tracking-widest font-sans font-semibold mb-3 block">Your Selection</span>
          <h1 className="font-serif text-display-lg text-white font-bold">Shopping Basket</h1>
          <p className="font-sans text-primary-fixed mt-2">{totalItems} item{totalItems !== 1 ? 's' : ''} in your basket</p>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-serif text-headline-lg-mobile text-primary">Items</h2>
              <button
                onClick={clearCart}
                className="text-error text-label-sm font-sans font-semibold uppercase tracking-wider hover:underline"
              >
                Clear All
              </button>
            </div>

            {cart.map(item => (
              <div key={item.id} className="bg-surface-container-lowest rounded-2xl p-5 flex gap-5 shadow-organic hover:shadow-organic-lg transition-all duration-300">
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link to={`/products/${item.id}`}>
                        <h3 className="font-serif font-semibold text-primary text-title-md hover:text-secondary transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">{item.weight} • {item.label}</p>
                      {/* Tags */}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {item.tags?.slice(0,2).map(tag => (
                          <span key={tag} className="bg-secondary-container/50 text-on-secondary-container text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-outline hover:text-error transition-colors p-1 shrink-0"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-surface-container-low rounded-full px-4 py-1.5 border border-outline-variant/20">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="font-sans font-bold text-body-md text-primary w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-sans font-bold text-title-md text-primary">₹{item.price * item.qty}</p>
                      <p className="text-label-sm text-on-surface-variant">₹{item.price} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link to="/products" className="flex items-center gap-2 text-secondary font-sans font-semibold hover:gap-3 transition-all mt-4">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-organic sticky top-24">
              <h2 className="font-serif text-headline-lg-mobile text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between font-sans text-body-md text-on-surface-variant">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-on-surface font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between font-sans text-body-md text-on-surface-variant">
                  <span>Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? 'text-secondary' : 'text-on-surface'}`}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-label-sm text-secondary bg-secondary-container/30 rounded-xl px-3 py-2">
                    🌿 Add ₹{999 - totalPrice} more for free delivery!
                  </p>
                )}
                <div className="border-t border-outline-variant/30 pt-4 flex justify-between">
                  <span className="font-sans font-bold text-title-md text-primary">Total</span>
                  <span className="font-serif font-bold text-headline-lg text-primary">₹{grandTotal}</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-full font-sans font-semibold text-title-md hover:bg-secondary transition-colors shadow-xl active:scale-95 mb-3 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined material-symbols-filled text-[20px]">lock</span>
                Proceed to Checkout
              </button>

              <button className="w-full border border-outline-variant py-3.5 rounded-full font-sans font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                Apply Coupon Code
              </button>

              {/* Trust */}
              <div className="mt-6 pt-5 border-t border-outline-variant/20 space-y-2">
                {[
                  { icon: 'lock', text: 'Secure & Encrypted Payment' },
                  { icon: 'verified', text: '100% Organic Certified' },
                  { icon: 'autorenew', text: '7-Day Return Policy' },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-2 text-label-sm text-on-surface-variant font-sans">
                    <span className="material-symbols-outlined material-symbols-filled text-secondary text-[16px]">{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
