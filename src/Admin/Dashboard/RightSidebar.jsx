import { ChevronDown } from "lucide-react";

export const RightSidebar = ({ handleComponentChange }) => {
  const appointments = [
    {
      time: "08:30 am - 10:30 am",
      title: "Fahad Visit",
      doctor: "Dr. Carol D. Pollack-rundle",
    },
    {
      time: "08:30 am - 10:30 am",
      title: "Fahad Visit",
      doctor: "Dr. Carol D. Pollack-rundle",
    },
    {
      time: "08:30 am - 10:30 am",
      title: "Fahad Visit",
      doctor: "Dr. Carol D. Pollack-rundle",
    },
  ];
  return (
    <div className="col-span-4 space-y-6 border-l p-3">
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleComponentChange("Prescription")}
          className="w-full bg-blue-100 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-200 shadow-md transition-colors"
        >
          Create Prescription
        </button>
        <button
          onClick={() => handleComponentChange("BookSeat")}
          className="w-full bg-blue-100 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-200 shadow-md transition-colors"
        >
          Book Seat
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="flex items-center justify-between gap-1">
        <h3 className="font-medium text-base text-gray-900">
          Upcoming Appointment
        </h3>
        <div className="flex items-center gap-1 text-sm text-white bg-blue-500 px-3 py-1 rounded">
          <span>Today</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 border-t pt-1">
        <p className="text-blue-500 font-medium text-sm">July 30, 2022</p>
        <div className="flex-1 border-t border-blue-500"></div>
      </div>

      <div className="bg-white p-2">
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 pb-6 border-b">
                <p className="text-sm text-gray-500 pb-2">{appointment.time}</p>
                <p className="font-medium text-gray-900 pb-2">
                  {appointment.title}
                </p>
                <p className="text-sm text-gray-500">{appointment.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Feedback */}
      <div className="bg-white">
        <h3 className="font-medium text-lg text-gray-900">Patient Feedback</h3>

        <div className="flex items-center gap-4">
          <div>Donut Chart</div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Excellent</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Good</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Poor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
