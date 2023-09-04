import React from "react";
import QueryAction from "./QueryAction";
import MutationAction from "./MutationAction";
import SubscriptionAction from "./SubscriptionAction";

const ActionsScreen = () => {
  return (
    <div className="grid grid-row-3  p-5 gap-4 w-full">
      <div className="container w-full h-10/12  mx-auto  border border-green-300 shadow rounded-md px-4">
        <QueryAction />
      </div>
      <div className="container h-full w-full mx-auto  border border-green-300 shadow rounded-md px-4">
        <MutationAction />
      </div>
      <div className="container h-full w-full mx-auto  border border-green-300 shadow rounded-md px-4">
        <SubscriptionAction />
      </div>
      <div></div>
    </div>
  );
};

export default ActionsScreen;
