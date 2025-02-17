import { GoalsChart } from "./goals-chart";
import { ExtendedUser } from "../page";

export interface GoalsProps {
  data: ExtendedUser;
}

const Goals: React.FC<GoalsProps> = ({ data }) => {
  return (
    <section className="p-4 ">
      <h2 className="text-2xl font-bold">Goals</h2>
      <GoalsChart data={data} />
    </section>
  );
};

export default Goals;
