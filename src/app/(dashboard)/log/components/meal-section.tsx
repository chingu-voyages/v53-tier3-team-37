import { FoodItem } from "@/types/foodlogtypes";
import Image from "next/image";

const MealSection = ({
  mealType,
  items,
}: {
  mealType: string;
  items: FoodItem[];
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{mealType}</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No foods added yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex  gap-2 bg-slate-700/60 backdrop-blur-sm rounded"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover w-[120px] h-[120px] aspect-square"
              />
              <div className="flex flex-col p-2 gap-2 text-white">
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <div className="flex text-center  gap-2">
                  <span>{item.calories} kcal</span>
                  <span>{item.protein}g protein</span>
                  <span>{item.carbs}g carbs</span>
                  <span>{item.fat}g fat</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealSection;
