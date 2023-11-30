import UpdateAzafataProvider from "../_context/update-azafata.context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <UpdateAzafataProvider>{children}</UpdateAzafataProvider>;
};

export default layout;
