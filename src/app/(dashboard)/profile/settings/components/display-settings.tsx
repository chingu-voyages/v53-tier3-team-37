import { settingsConfig } from "./config";
import SettingSection from "./setting-section";

const DisplaySettings = () => {
  return (
    <section className="bg-white rounded-b-xl overflow-y-auto flex-1 space-y-6 pt-5">
      {settingsConfig.map((section) => (
        <SettingSection key={section.id} section={section} />
      ))}
    </section>
  );
};

export default DisplaySettings;
