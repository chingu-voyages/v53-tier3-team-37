import AppNav from "../../components/navigation/dashboardNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto pb-[72px]">{children}</main>
        <AppNav />
    </div>
  );
};

export default DashboardLayout;
