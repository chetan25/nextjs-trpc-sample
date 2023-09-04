"use client";
import { lazy, Suspense, useState, useEffect } from "react";
import { useNameStore } from "@/app/hooks/states";

const AskName = lazy(() => import("@/app/components/AskName"));
const TrpcActionsScreen = lazy(
  () => import("@/app/components/TrpcActionsScreen")
);

const ActionsScreen = lazy(() => import("@/app/components/ActionsScreen"));

const Screen = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const name = useNameStore((state) => state.name);

  // this prevents the hydration issue
  if (!mounted)
    return (
      <div className="h-screen flex border border-blue-300 shadow rounded-md p-4  w-10/12"></div>
    );

  return (
    <div className="min-h-screen  border border-blue-300 shadow rounded-md p-4  w-10/12 mt-2">
      <Suspense fallback={<></>}>
        {!name ? (
          <div className="min-h-screen flex justify-center  w-full">
            <AskName />
          </div>
        ) : (
          <div className="min-h-screen flex justify-center w-full">
            <TrpcActionsScreen userName={name}>
              <ActionsScreen />
            </TrpcActionsScreen>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Screen;
