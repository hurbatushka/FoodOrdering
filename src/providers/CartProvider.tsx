import { CartItem, Product } from '@/types/types';
import { createContext, useContext, useState } from 'react';

type CartProviderProps = { children: React.ReactNode };
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size'], price: CartItem['price']) => void;
  removeItem: (item: CartItem) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size'], price: CartItem['price']) => {
    const newCartItem: CartItem = {
      id: Date.now().toLocaleString(),
      product_id: product.id,
      product,
      size,
      quantity: 1,
      price,
    };
    setItems([newCartItem, ...items]);
  };
  const removeItem = (item: CartItem) => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
