"use client";

import SettingsDialog from "./settings-dialog";

const accountSettings = [
  {
    id: "account",
    title: "Account",
    items: [
      { id: "name", label: "Name", type: "text" },
      { id: "email", label: "Email", type: "email" },
      { id: "password", label: "Password", type: "password" },
    ],
  },
  {
    id: "body",
    title: "Body Information",
    items: [
      { id: "height", label: "Height", type: "number" },
      { id: "weight", label: "Weight", type: "number" },
      { id: "targetWeight", label: "Target Weight", type: "number" },
      { id: "age", label: "Age", type: "number" },
      { id: "gender", label: "Gender", type: "select" },
    ],
  },
  {
    id: "dietary",
    title: "Dietary Preferences",
    items: [
      {
        id: "dietaryRestrictions",
        label: "Dietary Restrictions",
        type: "multiselect",
      },
      {
        id: "activeDiet",
        label: "Active Diet",
        type: "select",
      },
    ],
  },
  {
    id: "activity",
    title: "Activity Level",
    items: [{ id: "activityLevel", label: "Activity Level", type: "select" }],
  },
  {
    id: "health",
    title: "Health Conditions",
    items: [
      {
        id: "healthConditions",
        label: "Health Conditions",
        type: "multiselect",
      },
    ],
  },
];
const DisplaySettings = () => {
  return (
    <section className=" bg-white rounded-b-xl overflow-y-auto flex-1 space-y-6 pt-5">
      {accountSettings.map((settings, idx) => {
        return (
          <div key={idx} className="w-full">
            <h2 className="text-2xl font-bold mb-4 pl-2">{settings.title}</h2>
            <div className="flex flex-col  ">
              {settings.items.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex py-2 px-4 justify-between w-full ${
                      idx === settings.items.length - 1
                        ? "border-y"
                        : "border-t"
                    }
                ${idx % 2 === 0 ? "bg-gray-100" : ""}
                `}
                  >
                    <div>{item.label} </div>
                    <SettingsDialog
                      key={idx}
                      title={item.label}
                      type={item.type}
                      fieldId={item.id}
                      onConfirm={() => {}}
                    >
                      <p>{item.label}</p>
                    </SettingsDialog>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DisplaySettings;
