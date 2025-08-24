import { useEffect, useState } from "react";

export const Terms = () => {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data))
      .catch((err) => console.error("Error loading terms:", err));
  }, []);

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-3xl text-[#E4572E]">
        Terms & Conditions
      </h1>

      <div className="w-full">
        <ol className="list-decimal pl-5 space-y-6 text-2xl font-medium">
          {terms.map((item, index) => (
            <li key={index}>
              <h2 className="mb-2">{item.title}</h2>
              <ul className="list-disc pl-6 text-xl font-normal space-y-2">
                {item.body.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Terms;
