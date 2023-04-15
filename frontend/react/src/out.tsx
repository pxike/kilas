import React, { useCallback, useContext } from "react";
import { elas } from "./App";

export function Out({}) {

  const elaset = useContext(elas)

  return (

    <div className="rounded-md bg-gray-600  h-4/5 p-5 w-3/4 mr-4  ">
      <h2 className="text-2xl font-bold m-5 text-slate-900">
        RECOMMENDATIONS :
      </h2>
      <div className="w-6/7 h-5/6 bg-gray-600 mx-4 rounded-md  overflow-y-auto scrollbar-thin  scrollbar-thumb-gray-600 hover:bg-gray-500 transition duration-500 p-4">
      {elaset.output.vector.join('. ')}
      </div>
    </div>
    
  );
}
