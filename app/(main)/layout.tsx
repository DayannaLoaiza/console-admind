import SideNav from "@/ui/main/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="h-full bg-blue-50">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto ">{children}</div>
    </div>
  );
};

export default Layout;
