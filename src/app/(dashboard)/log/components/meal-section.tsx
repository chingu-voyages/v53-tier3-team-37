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
              className="flex justify-between p-2 bg-gray-50 rounded"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="rounded-md object-cover "
              />
              <span>{item.name}</span>
              <span>{item.calories} kcal</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealSection;
