"use client";

import SettingsDialog from "./settings-dialog";

type SettingItemProps = {
  label: string;
  type: string;
  fieldId: string;
  isLast: boolean;
  index: number;
};

const SettingItem = ({
  label,
  type,
  fieldId,
  isLast,
  index,
}: SettingItemProps) => {
  return (
    <div
      className={`flex py-2 px-4 justify-between w-full ${
        isLast ? "border-y" : "border-t"
      } ${index % 2 === 0 ? "bg-gray-100" : ""}`}
    >
      <div>{label}</div>
      <SettingsDialog
        title={label}
        type={type}
        fieldId={fieldId}
        onConfirm={() => {}}
      >
        <p>{label}</p>
      </SettingsDialog>
    </div>
  );
};

export default SettingItem;
