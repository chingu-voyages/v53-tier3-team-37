const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center border rounded-xl py-14 px-10 mt-[5rem] md:mt-[0] w-[90%] ">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
