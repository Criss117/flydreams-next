"use client";
import CreateAzafataProvider from "./_context/create-azafata.context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CreateAzafataProvider>{children}</CreateAzafataProvider>;
};

export default layout;
