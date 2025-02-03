"use client";

import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 border-b border-black h-10">
      <Search className="w-5 h-5 text-black shrink-0" />
      <input
        placeholder="Search for a recipe"
        className="w-full h-full ring-0 outline-none bg-transparent"
      />
    </div>
  );
};
