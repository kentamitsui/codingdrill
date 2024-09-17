export default function Header() {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">coding test preparation app</h1>
      <div className="ml-auto flex items-center justify-center">
        <button
          id="theme-toggle"
          className="flex h-10 w-10 items-center justify-center rounded-full dark:bg-background"
        >
          {/* light icon */}
          <svg
            id="lightButton"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          {/* dark icon */}
          <svg
            id="darkButton"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
        <button
          id="resetLayout"
          className="w-[120px] rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          reset layout
        </button>
      </div>
    </header>
  );
}
