import {useCallback} from 'react';
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen/client';

import CartUIProvider, {useCartUI} from './CartUIProvider.client';

/**
 * A client component that creates a cart object and provides callbacks that can be accessed by any descendent component using the `useCart` hook and related hooks
 */
type CartProviderProps = {
  children: React.ReactNode;
  numCartLines: number;
};
export default function CartProvider({
  children,
  numCartLines,
}: CartProviderProps) {
  return (
    <CartUIProvider>
      <Provider numCartLines={numCartLines}>{children}</Provider>
    </CartUIProvider>
  );
}

function Provider({children, numCartLines}: CartProviderProps) {
  const {openCart} = useCartUI();

  const open = useCallback(() => {
    openCart();
  }, [openCart]);

  return (
    <>
      <ShopifyCartProvider
        numCartLines={numCartLines}
        onLineAdd={open}
        onCreate={open}
      >
        {children}
      </ShopifyCartProvider>
    </>
  );
}
