"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Activity, CookingPot, Notebook, Salad, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/health", label: "Health", icon: <Activity /> },
  { href: "/recipes", label: "Recipes", icon: <CookingPot /> },
  { href: "/log", label: "Diary", icon: <Notebook /> },
  { href: "/pantry", label: "Pantry", icon: <Salad /> },
  { href: "/profile", label: "Profile", icon: <UserRound /> },
];

const AppNav = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black">
      <div className="flex justify-between">
        {links.map((link, idx) => (
          <div key={link.href} className="w-full flex justify-center ">
            <Link
              href={link.href}
              className={`flex flex-col py-3 w-full items-center justify-center rounded-lg text-white hover:bg-gray-800 transition-colors ${
                isActive(link.href)
                  ? "bg-slate-300 text-black hover:bg-slate-300"
                  : ""
              }`}
            >
              {link.icon}
              <span className="text-sm text-center mt-1">{link.label}</span>
            </Link>
            {idx < links.length - 1 && <Separator orientation="vertical" />}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default AppNav;
