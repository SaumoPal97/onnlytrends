import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/apiUtils";
import ReportCard from "@/components/ReportCard";

const Home = () => {
  const tags = ["technology", "design", "crypto", "ai"];
  const [taggedContent, setTaggedContent] = useState({
    technology: [
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
    ],
    design: [
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
    ],
    crypto: [
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
    ],
    ai: [
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
    ],
  });

  useEffect(() => {
    const fetchTaggedContent = async () => {
      for (let tag of tags) {
        const response = await fetch(`${API_URL}/reports?tag=${tag}`);
        setTaggedContent((prevState) => {
          return { ...prevState, [tag]: response };
        });
      }
    };
    fetchTaggedContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col pt-24">
      <div className="flex flex-col justify-center items-center text-5xl">
        <span className="mb-2 font-bold">The search engine for</span>
        <span className="mb-2 font-bold text-blue-700">the latest trends</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-8 mb-16">
        <Link to="/reports" className="mx-2">
          <Button size="sm" variant="outline">
            See All Reports
          </Button>
        </Link>
        <Link to="/chat" className="mx-2">
          <Button size="sm">Chat with AI</Button>
        </Link>
      </div>
      {tags.map((tag) => {
        return (
          <div key={tag} className="flex flex-col p-8">
            <span className="text-xl font-semibold">
              Top reports in <span className="text-blue-600">{`#${tag}`}</span>
            </span>
            <div className="flex flex-row mt-8 overflow-x-scroll">
              {(taggedContent[tag] || {}).map((content) => (
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
      })}
    </div>
  );
};

export default Home;
