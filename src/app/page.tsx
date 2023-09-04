"use client";
import { lazy, Suspense } from "react";
// import Screen from "@/app/components/Screen";
import trpc from "@/app/utils/trpcHelper";

const Screen = lazy(() => import("@/app/components/Screen"));

const Home = () => {
  return (
    <main className="min-h-screen">
      <div className="h-full flex flex-col items-center justify-center  p-5">
        <article className="prose lg:prose-l mt-10">
          <h1>Test Next JS and TRPC Operation</h1>
        </article>
        <Suspense fallback={<>loading......</>}>
          <Screen />
        </Suspense>
      </div>
    </main>
  );
};

export default trpc.withTRPC(Home);
