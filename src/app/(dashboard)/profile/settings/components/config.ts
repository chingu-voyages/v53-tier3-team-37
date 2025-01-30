export type SettingItem = {
  id: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export type TSettingSection = {
  id: string;
  title: string;
  items: SettingItem[];
};

export const settingsConfig: TSettingSection[] = [
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
      {
        id: "height",
        label: "Height",
        type: "number",
        placeholder: "Enter height in inches",
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        placeholder: "Enter weight in lbs",
      },
      {
        id: "targetWeight",
        label: "Target Weight",
        type: "number",
        placeholder: "Enter target weight in lbs",
      },
      {
        id: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter your age",
      },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
        ],
      },
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
        options: [
          { value: "PEANUTS", label: "Peanuts" },
          { value: "TREENUTS", label: "Tree Nuts" },
          { value: "FISH", label: "Fish" },
          { value: "SHELLFISH", label: "Shellfish" },
          { value: "SOY", label: "Soy" },
          { value: "EGG", label: "Eggs" },
          { value: "WHEAT", label: "Wheat" },
          { value: "DAIRY", label: "Dairy" },
          { value: "NONE", label: "None" },
        ],
      },
      {
        id: "activeDiet",
        label: "Active Diet",
        type: "select",
        options: [
          { value: "MEDITERRANEAN", label: "Mediterranean" },
          { value: "KETO", label: "Keto" },
          { value: "PALEO", label: "Paleo" },
          { value: "VEGAN", label: "Vegan" },
          { value: "CARNIVORE", label: "Carnivore" },
          { value: "ATKINS", label: "Atkins" },
          { value: "NONE", label: "None" },
        ],
      },
    ],
  },
];
