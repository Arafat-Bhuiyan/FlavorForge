import { useEffect, useState } from "react";
import publicApiInstance from "../../utils/publicApiInstance";


export const Terms = () => {
  const [terms, setTerms] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data, status } = await publicApiInstance.get("/terms-and-conditions/");
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
    <div className="w-full p-4 sm:p-8 flex flex-col justify-center items-center gap-6 sm:gap-10 my-8">
      <h1 className="font-semibold text-2xl sm:text-3xl text-[#E4572E] text-center">Terms & Conditions</h1>

      <div className="w-full">
        {/* Render the terms using dangerouslySetInnerHTML */}
        {terms ? (
          <div
            className="prose max-w-none text-base sm:text-lg font-medium"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        ) : (
          <p>Loading terms...</p> // Show a loading message if terms are not yet loaded
        )}
      </div>
    </div>
  );
};

export default Terms;
