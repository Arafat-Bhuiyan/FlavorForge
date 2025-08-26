export default function Privacy() {
  return (
    <div className="flex flex-col gap-6 text-[#2e2e2e]">
      <div>
        <h1 className="font-medium text-base">1. Privacy Policy Management</h1>
        <p className="text-xs">
          Purpose: Allow the admin to manage the Privacy Policy, explaining how
          user data is collected, stored, and used, without touching the code.
        </p>
      </div>
      <div>
        <h1 className="font-medium text-sm">Features:</h1>
        <ul className="text-xs list-disc list-inside flex flex-col gap-3">
          <li>
            <span className="font-medium">Rich Text Editor:</span> Same
            capabilities as above (headings, bullet points, numbered lists,
            links, formatting)
          </li>
          <li>
            <span className="font-medium">Preview Mode:</span>
            View how the Privacy Policy will appear to users before publishing.
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-medium text-sm">Version Control:</h1>
        <ul className="text-xs list-disc list-inside flex flex-col gap-3">
          <li>Stores the date and time of each update.</li>
          <li>Option to restore a previous version if needed.</li>
        </ul>
      </div>
      <p className="text-xs">
        <span className="font-medium">Publish Button:</span> Instantly updates
        the Privacy Policy on the live site.
      </p>
    </div>
  );
}
