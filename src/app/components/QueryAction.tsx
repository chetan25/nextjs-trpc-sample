import React, { useState } from "react";
import trpc from "@/app/utils/trpcHelper";
import {
  QueryClientBlock,
  QueryServerBlock,
} from "@/app/components/CodeBlocks";

const QueryAction = () => {
  const [jokeQuery] = trpc.useQueries((t) => [t.getJoke()]);

  const [joke, setJoke] = useState({
    loading: false,
    joke: null,
  });

  const getJoke = async () => {
    setJoke((oldJoke) => ({
      ...oldJoke,
      loading: true,
    }));
    const newJoke = await jokeQuery.refetch();
    console.log(newJoke);
    setJoke({
      joke: newJoke.data || "",
      loading: false,
    });
  };

  return (
    <article className="prose lg:prose-xl p-3">
      <h2>Query</h2>
      <p>
        A query is use to fetch data with Trpc, similar to a GET request in http
      </p>
      <div>
        <h3>Client Code</h3>
        <QueryClientBlock />
      </div>
      <div>
        <h3>Server Code</h3>
        <QueryServerBlock />
      </div>
      <p>Let&apos;s fire a Joke query to get a joke.</p>
      <button
        type="submit"
        onClick={getJoke}
        disabled={joke.loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-9/12"
      >
        <span>
          {joke.loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Joke Query
        </span>
      </button>
      {joke.joke && (
        <div
          id="toast-default"
          className="flex items-center w-10/12 p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
              />
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ml-3 text-m font-normal">{joke.joke}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => setJoke({ joke: null, loading: false })}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
};

export default QueryAction;
