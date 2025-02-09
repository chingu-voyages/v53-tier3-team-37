import Navbar from "@/components/navigation/NavBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]   ">
        <Navbar />
        <div className="flex flex-col items-center justify-center border rounded-xl py-10 px-10 mt-[7rem] md:mt-[8rem] w-[90%] ">
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
