"use client";
import { useContext, createContext, ReactNode, useState } from "react";
interface Alert {
  message: String;
  show: boolean;
}
type GlobalContextType = {
  openAlert: (message: String) => void;
  alert: Alert;
};

const productContextDefaultValues: GlobalContextType = {
  openAlert: () => {},
  alert: { message: "", show: false },
};

const GlobalContext = createContext<GlobalContextType>(
  productContextDefaultValues
);

export function useGlobal() {
  return useContext(GlobalContext);
}

type Props = {
  children: ReactNode;
};
export function GlobalProvider({ children }: Props) {
  const [alert, setAlert] = useState<Alert>({ message: "", show: false });

  function openAlert(message: String) {
    console.log("alert oepn");
    setAlert({ message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 1000);
  }

  const value = {
    openAlert,
    alert: alert,
  };

  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}
