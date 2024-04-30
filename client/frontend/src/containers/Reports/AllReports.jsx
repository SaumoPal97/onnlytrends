import { useEffect, useState } from "react";
import { API_URL } from "@/utils/apiUtils";
import ReportCard from "@/components/ReportCard";

const AllReports = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await fetch(`${API_URL}/reports`);
      const res = await response.json();
      setContents((prevState) => {
        return [...prevState, ...res.data];
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
