"use client";
import { ReactNode, lazy } from "react";
import trpc from "@/app/utils/trpcHelper";
import { useNameStore } from "@/app/hooks/states";

const Loader = lazy(() => import("@/app/components/Loader"));

const TrpcActionsScreen = ({
  userName,
  children,
}: {
  userName: string;
  children: ReactNode;
}) => {
  const name = useNameStore((state) => state.name);
  const hello = trpc.hello.useQuery({ text: name! });

  const handleClick = () => {
    console.log("dsdsdsds");
    // mutation.mutate({ id: 2 });
    console.log("after");
  };

  return !hello.data ? (
    <div className="w-full min-h-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="min-h-full w-full flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-bold underline">{hello.data?.greeting}</h1>
      </div>
      {children}
    </div>
  );
};

export default TrpcActionsScreen;
