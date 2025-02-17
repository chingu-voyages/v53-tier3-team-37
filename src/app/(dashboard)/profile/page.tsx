"use client";

import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Summary from "./components/summary";
import Achievements from "./components/achievements";
import Goals from "./components/goals";
import UserAvatar from "@/assets/icons/user.png";
import type {
  User,
  DailyHealthLog,
  Goal,
  GoalTracking,
  Tracking,
} from "@prisma/client";

// Extend the Prisma User type to include relations
export type ExtendedUser = User & {
  healthLogs: DailyHealthLog[];
  goals: Goal[];
  goalTracking: GoalTracking & {
    food: Tracking;
    exercise: Tracking;
    sleep: Tracking;
  };
};

// The shape of your API response. Adjust if needed.
interface UserResponse {
  data: ExtendedUser;
}

const ProfilePage: React.FC = () => {
  // Use ExtendedUser in state so TS knows the full shape
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      try {
        const res = await fetch(`${baseUrl}/api/user`, {
          cache: "no-store",
          credentials: "include",
        });
        // The response could either be an object with a "data" property
        // or the ExtendedUser directly. Adjust based on your API.
        const data: UserResponse | ExtendedUser = await res.json();
        console.log("data:", data);
        if ("data" in data) {
          setUser(data.data);
        } else {
          setUser(data as ExtendedUser);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error: Unable to load user data.</div>;

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
          <h2 className="text-4xl font-bold">{user.name}</h2>
        </div>
      </section>

      <div className="overflow-y-auto flex-1">
        {user.healthLogs ? (
          <Summary data={user} />
        ) : (
          <div>No Health Log data available</div>
        )}{" "}
        {user.goalTracking ? (
          <Goals data={user} />
        ) : (
          <div>No goal tracking data available</div>
        )}{" "}
        {user.goals ? (
          <Achievements data={user} />
        ) : (
          <div>No goal achievements data available</div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
