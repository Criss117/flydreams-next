import Aside from "./_components/aside";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen grid grid-cols-8">
      <Aside />
      <div className="col-span-7 bg-blue-100">{children}</div>
    </main>
  );
};

export default layout;
