import { useState } from "react";
import { toast } from "react-toastify";
import authApiInstance from "../../utils/privateApiInstance";
import vector from "../../assets/images/Vector.png";

export const DeleteAccount = ({ setOpenSection }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

const handleDeleteAccount = async () => {
  // Validation checks
  if (deleteConfirmation !== "DELETE") {
    console.log(deleteConfirmation);
    setDeleteError("Please type DELETE to confirm");
    return;
  }

  if (!isChecked) {
    setDeleteError("Please check the consequences checkbox");
    return;
  }

  console.log(deleteConfirmation); // এটা "DELETE" হবে
  setIsDeleting(true);
  console.log(isChecked); // এটা true হবে
  setDeleteError("");

  try {
    const res = await authApiInstance.post("/user/account/delete/", {
      confirmation: "true",  // API expects "true" string
      agreement: "true"      // API expects "true" string
    });

    if (res.status === 200) {
      toast.success("Account deleted successfully");
      localStorage.clear();
      window.location.href = "/login";
    }
  } catch (error) {
    toast.error("Account deletion failed. Try again.");
    setDeleteError(
      error.response?.data?.message ||
        "Something went wrong. Please try again."
    );
    console.log(error);
  } finally {
    setIsDeleting(false);
  }
};

  const handleCancelDelete = () => {
    setOpenSection(null);
    setDeleteConfirmation("");
    setIsChecked(false);
    setDeleteError("");
  };

  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-center gap-5">
          <img src={vector} className="w-7 h-7" alt="" />
          <h3 className="text-[#2E2E2E] font-medium text-2xl mb-2">
            Delete Account Page UI
          </h3>
        </div>
        <div className="p-4 w-[571px] mx-auto bg-[#FFEAEA] flex items-center">
          <p className="text-sm text-[#2e2e2e] mb-3">
            Once deleted, your account cannot be recovered. All your recipes,
            preferences, and subscription data will be permanently removed.
          </p>
        </div>

        <div>
          <p className="font-medium text-base text-black mb-4">
            Type <span className="text-[#E4572E]">DELETE</span> to confirm
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE here"
              className="text-base bg-[#FDF8F8] border border-[#E4572E]/25 p-2 rounded-lg focus:outline-none focus:border-[#E4572E]"
            />

            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                className="mr-2"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              I understand the consequences
            </label>

            {deleteError && (
              <p className="text-red-500 text-sm mb-3">{deleteError}</p>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-[#E42E2E] text-white font-medium text-base w-full py-2 rounded-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </button>
          <button
            onClick={handleCancelDelete}
            className="border-[#CCCCCC]/23 bg-[#FFFDFD] w-full py-2 border rounded-lg font-medium text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
