import videoIns from "../../assets/images/videoInstruction.png";
import play from "../../assets/images/playButton.png";

export const VideoInstruction = () => {
  return (
    <div id="how-it-works" className="w-full flex items-center mt-10">
      <div className="w-1/2 flex flex-col gap-6 text-[#2E2E2E] pr-6">
        <h1 className="font-semibold text-4xl">How it work</h1>
        <p className="font-medium text-base">
          Your personal AI chef — choose your ingredients or type them in, <br /> and
          get instant, delicious recipes tailored just for you
        </p>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 32 32"
          >
            <g fill="none">
              <path
                fill="#00d26a"
                d="m28.902 8.361l-.01.01a3.733 3.733 0 0 1-.24 5.01a3.72 3.72 0 0 1-5.27 0a3.72 3.72 0 0 1-1.078-2.278L20.5 12.908l-1.415-1.414l1.746-1.745a3.7 3.7 0 0 1-2.139-1.058a3.72 3.72 0 0 1 0-5.27a3.73 3.73 0 0 1 4.92-.31l.02-.02c1.45-1.46 3.81-1.45 5.27 0a3.72 3.72 0 0 1 0 5.27"
              ></path>
              <path
                fill="#ff822d"
                d="m4.642 29.891l15.75-5.1c4.51-1.46 5.88-7.17 2.53-10.52l-5.2-5.2c-3.35-3.35-9.06-1.97-10.52 2.53l-5.1 15.75c-.51 1.57.97 3.05 2.54 2.54"
              ></path>
              <path
                fill="#ff6723"
                d="M12.373 19.411c.49-.49.49-1.28 0-1.78l-5.38-5.38l-.87 2.68l4.47 4.47c.49.5 1.29.5 1.78.01m-3.78 4.55c-.49.49-.49 1.28 0 1.78l2.17 2.17l2.68-.87l-3.08-3.08a1.25 1.25 0 0 0-1.77 0m7.66-4.98c-.49-.5-.49-1.29 0-1.78s1.28-.49 1.78.01l5.43 5.43c-.5.66-1.14 1.22-1.9 1.65z"
              ></path>
            </g>
          </svg>
          <p className="font-medium text-base"> Pick Your Ingredients –</p>
          <p className="text-sm text-[#370D00]">
            Select from popular ingredients or type your own.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 32 32"
          >
            <path
              fill="#1288F6"
              d="M30.47 18.28V7.62h-1.52v9.14h-1.52v-1.52H25.9v12.19h1.53V25.9h3.04v-1.52H32v-6.1zm-6.09-6.09h1.52v3.05h-1.52ZM6.09 27.43v1.52h1.53v1.53h1.52v-1.53h13.71v1.53h1.53v-1.53h1.52v-1.52zm16.76-9.15h1.53v3.05h-1.53Zm0-7.61h1.53v1.52h-1.53Zm-3.04 6.09h3.04v1.52h-3.04ZM9.14 30.48h13.71V32H9.14Zm10.67-9.15h3.04v1.53h-3.04Zm-1.53-3.05h1.53v3.05h-1.53Zm0-16.76h1.53v1.53h-1.53Zm-4.57 22.86h4.57v1.52h-4.57Zm0-24.38h4.57v1.52h-4.57Zm-1.52 18.28h1.52v3.05h-1.52Zm0-16.76h1.52v1.53h-1.52ZM9.14 16.76h3.05v1.52H9.14Zm13.71-6.09V9.14h-6.09V4.57h1.52V3.05h-4.57v1.52h1.52v4.57H9.14v1.53z"
            ></path>
            <path
              fill="#1288F6"
              d="M9.14 21.33h3.05v1.53H9.14Zm-1.52-3.05h1.52v3.05H7.62Zm0-7.61h1.52v1.52H7.62Zm-1.53 1.52h1.53v3.05H6.09Zm0 3.05H4.57v1.52H3.04V7.62H1.52v10.66H0v6.1h1.52v1.52h3.05v1.53h1.52z"
            ></path>
          </svg>
          <p className="font-medium text-base"> Meet Your AI Chef –</p>
          <p className="text-sm text-[#370D00]">
            Watch as it whips up delicious recipe ideas just for you.{" "}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#CC7133"
              strokeLinecap="round"
              strokeWidth={1.5}
            >
              <path d="M21 17a5 5 0 0 1 0-10"></path>
              <path d="M21 21a9 9 0 1 1 0-18"></path>
              <path
                strokeLinejoin="round"
                d="M6 3v5m0 13V11M3.5 8h5M9 3v4.352c0 4.864-6 4.864-6 0V3"
              ></path>
            </g>
          </svg>
          <p className="font-medium text-base"> Cook & Enjoy –</p>
          <p className="text-sm text-[#370D00]">
            Follow the recipe and savor the flavor!
          </p>
        </div>
      </div>

      {/* Video Instruction */}
      <div className="w-1/2 relative">
        <img src={videoIns} alt="" />
        <img src={play} className="absolute bottom-28 left-60" alt="" />
      </div>
    </div>
  );
};
