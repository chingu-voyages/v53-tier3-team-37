import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);
  if (session) {
    redirect("/profile"); 
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-left">
          AI-powered recipe recommendations for your health
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Your personal recipe assistant, tailored for you.
        </p>
        <div className="mt-6">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
