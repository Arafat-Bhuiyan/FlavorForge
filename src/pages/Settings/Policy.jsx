import { useEffect, useState } from "react";

export const Policy = () => {
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    fetch("/policy.json")
      .then((res) => res.json())
      .then((data) => setPolicy(data))
      .catch((err) => console.error("Error loading policy:", err));
  }, []);

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-3xl text-[#E4572E]">Privacy Policy</h1>

      <div className="w-full">
        <ol className="list-decimal pl-5 space-y-6 text-2xl font-medium">
          {policy.map((item) => (
            <li key={item.id}>
              <h2 className="mb-2">{item.title}</h2>

              <ul className="list-disc pl-6 text-xl font-normal space-y-2">
                {Array.isArray(item.content) ? (
                  item.content.map((point, i) => <li key={i}>{point}</li>)
                ) : (
                  <li>{item.content}</li>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Policy;
