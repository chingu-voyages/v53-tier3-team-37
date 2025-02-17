import React from "react";
import { ExtendedUser } from "../page";

interface AchievementsProps {
  data: ExtendedUser;
}

const Achievements: React.FC<AchievementsProps> = ({ data }) => {
  console.log("We will get achievements from here:", data);
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-2">Achievements</h2>
      <div className="grid-cols-8 grid-rows-5 grid gap-4 bg-white rounded-xl p-4">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="bg-slate-300 rounded-xl h-10 w-10 flex items-center justify-center">
            {index}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
