"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-[calc(100dvh-4.5rem)] bg-slate-300"
    >
      <section className="p-4 bg-white rounded-b-xl">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </Link>
        <h1 className="text-2xl font-bold mt-4">Settings</h1>
      </section>

      {/* Add your settings content here */}
    </motion.main>
  );
};

export default SettingsPage;
