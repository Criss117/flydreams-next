"use client";

import CreatePasajeroProvider from "./_context/create-pasajero.context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CreatePasajeroProvider>{children}</CreatePasajeroProvider>;
};

export default layout;
