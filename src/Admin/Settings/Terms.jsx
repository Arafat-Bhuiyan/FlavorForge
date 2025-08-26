export default function Terms() {
  return (
    <div className="flex flex-col gap-6 text-[#2e2e2e]">
      <div>
        <h1 className="font-medium text-base">
          1. Terms & Conditions Management
        </h1>
        <p className="text-xs">
          Purpose: Allow the admin to create, edit, and publish the Terms &
          Conditions for the AI food recipe generator app without editing the
          source code
        </p>
      </div>
      <div>
        <h1 className="font-medium text-sm">Features:</h1>
        <ul className="text-xs list-disc list-inside flex flex-col gap-3">
          <li>
            <span className="font-medium">Rich Text Editor:</span> Supports
            headings, bullet points, numbered lists, links, and formatting for
            easy structuring of legal text.
          </li>
          <li>
            <span className="font-medium">Preview Mode:</span> Admin can preview
            exactly how the Terms & Conditions will appear to users before
            publishing.
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-medium text-sm">Version Control:</h1>
        <ul className="text-xs list-disc list-inside flex flex-col gap-3">
          <li>Stores the date and time of each update.</li>
          <li>Allows reverting to any previous version.</li>
        </ul>
      </div>
      <p className="text-xs">
        <span className="font-medium">Publish Button:</span> Instantly updates
        the Terms & Conditions on the live site.
      </p>
    </div>
  );
}

