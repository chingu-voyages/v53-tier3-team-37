import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import React from "react";

type ThirdPartyButtonsProps = {
  onClick: () => void;
  icon: "apple" | "github" | "google";
};

const ThirdPartyButtons = ({ onClick, icon }: ThirdPartyButtonsProps) => {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="p-7 h-12 w-12 rounded-lg"
      onClick={onClick}
    >
      <Icon icon={icon} />
    </Button>
  );
};

export default ThirdPartyButtons;
