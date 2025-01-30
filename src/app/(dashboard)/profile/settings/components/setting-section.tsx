import { TSettingSection } from "./config";
import SettingItem from "./setting-item";

type SettingSectionProps = {
  section: TSettingSection;
};

const SettingSection = ({ section }: SettingSectionProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 pl-2">{section.title}</h2>
      <div className="flex flex-col">
        {section.items.map((item, idx) => (
          <SettingItem
            key={item.id}
            label={item.label}
            type={item.type}
            fieldId={item.id}
            isLast={idx === section.items.length - 1}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingSection;
