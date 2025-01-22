const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center border rounded-xl py-14 px-10 mt-[0] md:mt-[5rem] w-[90%] ">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
