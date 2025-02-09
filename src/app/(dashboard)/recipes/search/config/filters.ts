export const filters = [
  {
    name: "Calories",
    min: 0,
    max: 800,
    step: 50,
    minStepsBetweenThumbs: 2,
    unit: "kcal",
  },
  {
    name: "Protein",
    min: 0,
    max: 50,
    step: 5,
    minStepsBetweenThumbs: 1,
    unit: "g",
  },

  {
    name: "Fat",
    min: 0,
    max: 30,
    step: 5,
    minStepsBetweenThumbs: 1,
    unit: "g",
  },

  {
    name: "Carbohydrates",
    min: 0,
    max: 100,
    step: 10,
    minStepsBetweenThumbs: 1,
    unit: "g",
  },
] as const;
