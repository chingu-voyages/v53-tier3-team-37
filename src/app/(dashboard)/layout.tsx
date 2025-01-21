import AppNav from "../../components/navigation/dashboardNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-dvh bg-white">
      <div className="pb-[4.5rem]">{children}</div>
      <AppNav />
    </div>
  );
};

export default DashboardLayout;
