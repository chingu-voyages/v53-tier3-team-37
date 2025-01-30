import { Settings } from "lucide-react";
import Image from "next/image";
import React from "react";
import UserAvatar from "@/assets/icons/user.png";
import Summary from "./components/summary";
import Achievements from "./components/achievements";
import Goals from "./components/goals";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)] bg-slate-300">
      <section className="p-4 bg-white rounded-b-xl flex flex-col justify-center items-center">
        <div className="flex justify-end border rounded-full p-3 self-end hover:bg-slate-100">
          <Link href="/profile/settings">
            <Settings className="w-6 h-6 text-slate-500" />
          </Link>
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <Image
            src={UserAvatar}
            alt="Profile Image"
            width={24}
            height={24}
            className="rounded-full h-28 bg-slate-300 w-28"
          />
          <h2 className="text-4xl font-bold">Jane Doe</h2>
        </div>
      </section>

      <div className="overflow-y-auto flex-1 ">
        <Summary />

        <Goals />

        <Achievements />
      </div>
    </main>
  );
};

export default ProfilePage;
