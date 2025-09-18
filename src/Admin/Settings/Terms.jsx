import { useEffect, useState } from "react";
import authApiInstance from "../../utils/privateApiInstance";
import { toast } from "react-toastify";

export default function Terms() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await authApiInstance.get("/terms-and-conditions/");
        setContent(res.data?.content || "");
        setNewContent(res.data?.content || "");
      } catch (err) {
        console.error("Error fetching terms & conditions:", err);
        toast.error("Failed to fetch terms & conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const handleSave = async () => {
    try {
      const res = await authApiInstance.patch("/terms-and-conditions/", {
        content: newContent,
      });
      setContent(res.data?.content || newContent);
      setIsEditing(false);
      toast.success("Terms & Conditions updated successfully");
    } catch (err) {
      console.error("Error updating terms & conditions:", err);
      toast.error("Failed to update terms & conditions");
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading terms & conditions...</p>;
  }

  return (
    <div className="flex flex-col gap-6 text-[#2e2e2e]">
      <div>
        <h1 className="font-medium text-base">Terms & Conditions</h1>
        <p className="text-xs">
          Admin can view and update the terms & conditions content here. <br />
          <span className="font-medium text-[#E4572E]">
            Note: Please provide the content as an HTML string. You can use tags
            like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt; etc.
            to format the content.
          </span>
        </p>
      </div>

      {isEditing ? (
        <textarea
          className="border p-2 rounded-md w-full text-sm"
          rows={10}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : content ? (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-sm text-gray-500">No terms & conditions available.</p>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              className="bg-[#E4572E] text-white px-4 py-2 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={() => {
                setIsEditing(false);
                setNewContent(content);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-[#E4572E] text-white px-6 py-2 rounded-lg"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
