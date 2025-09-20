// app/sections/ContinueLearningSection.jsx
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import { getRecentActivityData } from "@/lib/dashboard/api";

const ContinueLearningSection = async () => {
  const data = await getRecentActivityData();

  return <ContinueLearning data={data} />;
};

export default ContinueLearningSection;
