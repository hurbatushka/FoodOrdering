import { CartItem, Product } from '@/types/types';
import products from '@assets/data/products';
import { createContext, useContext, useState } from 'react';

type CartProviderProps = { children: React.ReactNode };
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size'], price: CartItem['price']) => void;
  removeItem: (item: CartItem) => void;
  updateQuantity: (id: string, amount: -1 | 1) => void;
  removeAllitems: () => void;
  HasItems: () => boolean;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  removeAllitems: () => {},
  updateQuantity: () => {},
  HasItems: (): boolean | any => {},
  total: 0,
});

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size'], price: CartItem['price']) => {
    const existingItem = items.find((item) => item.product === product && item.size === size);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
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
    setItems(items.filter((i) => i.id !== item.id));
  };
  const removeAllitems = () => {
    setItems([]);
  };
  const HasItems = (): boolean => {
    console.log(items.length > 0);

    return items.length > 0;
  };

  const updateQuantity = (id: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== id
            ? item
            : {
                ...item,
                quantity: item.quantity + amount,
              },
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        removeAllitems,
        HasItems,
        updateQuantity,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
