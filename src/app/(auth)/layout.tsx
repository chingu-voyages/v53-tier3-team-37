import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <div className="flex flex-col items-center justify-center border rounded-xl py-14 px-10 w-[90%]">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
