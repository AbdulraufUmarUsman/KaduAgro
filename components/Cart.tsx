import React, { useState } from 'react';
import { CartItem } from '../types';
import { CURRENCY_SYMBOL } from './constants';
import { X, Trash2, ShoppingBag, CheckCircle2, Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const [orderStep, setOrderStep] = useState<'cart' | 'checkout' | 'processing' | 'success'>('cart');
  const [buyerName, setBuyerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [deliveryFee, setDeliveryFee] = useState(1500); // Fixed for simplicity, could be dynamic

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = subtotal + (items.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setOrderStep('checkout');
  };

  const confirmOrder = () => {
    if (!buyerName.trim() || !deliveryAddress.trim()) {
      alert("Please enter your name and delivery address.");
      return;
    }
    setOrderStep('processing');
    setTimeout(() => {
      setOrderStep('success');
    }, 1500);
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    
    // Receipt Header
    doc.setFontSize(22);
    doc.setTextColor(5, 150, 105); // Emerald 600
    doc.text('KaduAgro Receipt', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    
    doc.text(`Date: ${dateStr}`, 20, 40);
    doc.text(`Time: ${timeStr}`, 20, 48);
    doc.text(`Cashier: KaduAgro Auto-System`, 20, 56);
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 62, 190, 62);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Customer Details', 20, 72);
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Buyer Name: ${buyerName}`, 20, 82);
    doc.text(`Delivery Address: ${deliveryAddress}`, 20, 90);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 98);
    
    doc.line(20, 104, 190, 104);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Order Items', 20, 114);
    
    const tableData = items.map(item => [
      item.product.name,
      item.packageLabel,
      item.marketName,
      item.quantity.toString(),
      `${CURRENCY_SYMBOL}${new Intl.NumberFormat('en-NG').format(item.unitPrice)}`,
      `${CURRENCY_SYMBOL}${new Intl.NumberFormat('en-NG').format(item.totalPrice)}`
    ]);

    (doc as any).autoTable({
      startY: 120,
      head: [['Product', 'Package', 'Market', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [5, 150, 105] },
      styles: { fontSize: 10, cellPadding: 3 },
    });
    
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(12);
    doc.text(`Subtotal: NGN ${new Intl.NumberFormat('en-NG').format(subtotal)}`, 130, finalY);
    doc.text(`Delivery Fee: NGN ${new Intl.NumberFormat('en-NG').format(deliveryFee)}`, 130, finalY + 8);
    
    doc.setFontSize(16);
    doc.setTextColor(5, 150, 105);
    doc.text(`Total: NGN ${new Intl.NumberFormat('en-NG').format(total)}`, 130, finalY + 20);
    
    doc.save(`KaduAgro_Receipt_${Date.now()}.pdf`);
  };

  const handleClose = () => {
    if (orderStep === 'success') {
      onClearCart();
      setOrderStep('cart');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" />
            Your Cart
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition"
            disabled={orderStep === 'processing'}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {orderStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-emerald-600 font-bold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-900 leading-tight">{item.product.name}</h4>
                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              className="text-red-400 hover:text-red-600 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">{item.packageLabel} • {item.marketName}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100"
                            >-</button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100"
                            >+</button>
                          </div>
                          <span className="font-black text-emerald-700">
                            {CURRENCY_SYMBOL}{new Intl.NumberFormat('en-NG').format(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {orderStep === 'checkout' && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-lg border-b pb-2">Delivery Details</h3>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Buyer's Name</label>
                <input 
                  type="text" 
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Address</label>
                <textarea 
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter full delivery address"
                  rows={3}
                  className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
          )}

          {orderStep === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900">Processing Order...</h3>
              <p className="text-gray-500 mt-2 text-center">Sending your order to {items.length} vendor(s).</p>
            </div>
          )}

          {orderStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300 text-center">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 mb-8 px-4">
                Your order for {items.length} item(s) has been successfully placed. Our delivery agent will contact you shortly.
              </p>
              <div className="flex flex-col w-full gap-3 px-4">
                <button 
                  onClick={generateReceipt}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                  <Download size={20} />
                  Download Receipt
                </button>
                <button 
                  onClick={handleClose}
                  className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {(orderStep === 'cart' || orderStep === 'checkout') && items.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-200 shrink-0">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-bold text-gray-900">{CURRENCY_SYMBOL}{new Intl.NumberFormat('en-NG').format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-900">{CURRENCY_SYMBOL}{new Intl.NumberFormat('en-NG').format(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-emerald-700">{CURRENCY_SYMBOL}{new Intl.NumberFormat('en-NG').format(total)}</span>
              </div>
            </div>
            
            {orderStep === 'cart' ? (
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 active:scale-95 transition shadow-lg shadow-emerald-200"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => setOrderStep('cart')}
                  className="px-4 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button 
                  onClick={confirmOrder}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 active:scale-95 transition shadow-lg shadow-emerald-200"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
