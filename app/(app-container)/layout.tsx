import Sidebar from "@/components/app-container/Sidebar";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
      <Sidebar />
      <main className="p-10 flex flex-col bg-white min-h-[100vh] w-full">
        {children}
      </main>
    </div>
  );
};
export default AppContainer;
