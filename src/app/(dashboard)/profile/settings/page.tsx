import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DisplaySettings from "./components/display-settings";

const SettingsPage = () => {
  return (
    <main className="flex flex-col h-[calc(100dvh-4.5rem)] bg-white">
      <section className="p-4 shadow-lg border-b-2 ">
        <h1 className="text-5xl font-bold mb-4 ">Settings</h1>

        <Link
          href="/profile"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 "
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </Link>
      </section>

      <DisplaySettings />
    </main>
  );
};

export default SettingsPage;
