import { createContext, useCallback, useContext, useMemo, useState } from "react";

const GiftModalContext = createContext(null);

export function GiftModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openGiftModal = useCallback(() => setOpen(true), []);
  const closeGiftModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openGiftModal, closeGiftModal }),
    [open, openGiftModal, closeGiftModal],
  );

  return (
    <GiftModalContext.Provider value={value}>
      {children}
    </GiftModalContext.Provider>
  );
}

export function useGiftModal() {
  const ctx = useContext(GiftModalContext);
  if (!ctx) throw new Error("useGiftModal must be used within GiftModalProvider");
  return ctx;
}
