'use client';

import { createContext, useContext } from 'react';

interface WithChildrenProps {
  children?: any;
}

export interface StoreDetailsProps extends WithChildrenProps {
  pocketbaseAPIBaseUrl: string;
}

const StoreContext = createContext<StoreDetailsProps>({
  pocketbaseAPIBaseUrl: ''
});

const StoreContextProvider = ({
  children,
  pocketbaseAPIBaseUrl,
}: StoreDetailsProps) => {

  const storeContext = {
    pocketbaseAPIBaseUrl,
  };

  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const storeCtx = useContext(StoreContext);
  if (!storeCtx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return storeCtx;
};

export { StoreContextProvider, useStore };