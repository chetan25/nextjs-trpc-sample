import React, { useRef } from "react";
import { MutationClientBlock, MutationServertBlock } from "./CodeBlocks";
import trpc from "@/app/utils/trpcHelper";
import { useNameStore } from "@/app/hooks/states";

const MutationAction = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const mutation = trpc.update.useMutation();
  const setName = useNameStore((state) => state.setName);

  const handleClick = async () => {
    console.log(nameRef.current?.value, "name");
    // for some reason mutation does not return a value
    await mutation.mutate({ name: nameRef.current?.value! });
    setName(nameRef.current?.value!);
  };

  return (
    <article className="prose lg:prose-xl p-3">
      <h2>Mutation</h2>
      <p>
        A mutation is use to create/update data with Trpc, similar to a Post/Put
        request in http
      </p>
      <div>
        <h3>Client Code</h3>
        <MutationClientBlock />
      </div>
      <div>
        <h3>Server Code</h3>
        <MutationServertBlock />
      </div>
      <div>
        <h4>Let&apos;s Fire mutation.</h4>
        <input ref={nameRef} placeholder="Enter Name" className="p-4 mr-4" />
        <button
          onClick={handleClick}
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Update Name
        </button>
      </div>
    </article>
  );
};

export default MutationAction;
