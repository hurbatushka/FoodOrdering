import { createContext, useContext } from 'react';

const CartContext = createContext({});

type CartProviderProps = { children: React.ReactNode };
const CartProvider = ({ children }: CartProviderProps) => {
  return (
    <CartContext.Provider value={{ items: [], onAddItem: () => {}, onRemoveItem: () => {} }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
