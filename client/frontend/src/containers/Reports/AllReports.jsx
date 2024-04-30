import { useEffect, useState } from "react";
import { API_URL } from "@/utils/apiUtils";
import ReportCard from "@/components/ReportCard";

const AllReports = () => {
  const [contents, setContents] = useState([
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
    {
      id: "pinterest",
      title: "Pinterest Predicts 2024",
      description:
        "People use Pinterest to plan for the future, which means we can spot new trends before anyone else. Discover the top trends for 2024, from fashion to food and everything in between. You can use these trends to stay ahead of the curve—whether you’re trendsetting or trend-shopping.",
      imageUrl: "/image.png",
      tags: ["technology", "design", "fashion", "marketing"],
    },
  ]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await fetch(`${API_URL}/reports`);
      setContents((prevState) => {
        return [...prevState, response];
      });
    };
    fetchContents();
  }, []);
  return (
    <div className="flex flex-col pt-24">
      <div className="flex flex-col justify-center items-center text-5xl">
        <span className="mb-2 font-bold">All Reports</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-4">
        {(contents || []).map((content) => (
          <ReportCard
            key={content.id}
            id={content.id}
            title={content.title}
            description={content.description}
            imageUrl={content.imageUrl}
            tags={content.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default AllReports;
