import { useEffect, useState } from "react";
import publicApiInstance from "../../utils/publicApiInstance";


export const Terms = () => {
  const [terms, setTerms] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data, status } = await publicApiInstance.get("/privacy-policy/");
        console.log(data); // Useful for debugging
        console.log(status); // Useful for debugging
        setTerms(data?.content); // Assuming data.content is the HTML string
      } catch (error) {
        console.log("Error fetching terms:", error);
      }
    };

    fetchTerms(); // Fetching data when the component mounts
  }, []);

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-3xl text-[#E4572E]">Privacy & Policy</h1>

      <div className="w-full">
        {/* Render the terms using dangerouslySetInnerHTML */}
        {terms ? (
          <div
            className="text-xl font-medium"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        ) : (
          <p>Loading policy...</p> // Show a loading message if terms are not yet loaded
        )}
      </div>
    </div>
  );
};

export default Terms;
