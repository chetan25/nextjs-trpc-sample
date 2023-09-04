"use client";

import { useRef, MouseEvent, useState } from "react";

import { useNameStore } from "@/app/hooks/states";

const AskName = () => {
  const setName = useNameStore((state) => state.setName);
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleStartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(false);
    const value = nameRef.current!.value;
    if (!value) {
      console.log(value, "value");
      setError(true);
      return;
    }
    setName(value);
  };

  return (
    <form className="w-full h-full m-5">
      {/* <h3>Enter your name to begin</h3> */}
      <label className="block">
        <input
          type="text"
          placeholder="Please enter your name"
          ref={nameRef}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
        />
      </label>
      <button
        type="submit"
        onClick={handleStartClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      >
        Start
      </button>

      {error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
          role="alert"
        >
          <strong className="font-bold">Error!!! </strong>
          <span className="block sm:inline">
            You need to atleast enter your name or a character to continue.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => {
              setError(false);
            }}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
    </form>
  );
};

export default AskName;
