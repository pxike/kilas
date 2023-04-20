import React, { useCallback, useContext } from "react";
import { elas } from "./App";
import { searches} from "./api"



function PictureList(props:any) {
  const { pictureNames } = props;
  const pictures = pictureNames.map((pictureName:string) => (
    <img className="p-2 rounded-md" key={pictureName} src={`/images/${pictureName}`} alt={pictureName} />
  ));
  return <div className=" flex flex-wrap justify-between">{pictures}</div>;
}

export function Out({}) {

  const elaset = useContext(elas).output
  return (
    <div className="rounded-md bg-gray-600  h-4/5 p-5 w-3/4 mr-4  ">
      <h2 className="text-2xl font-bold m-5 text-slate-900">
        RECOMMENDATIONS :
      </h2>
      <div className="w-6/7 h-5/6 bg-gray-600 mx-4 rounded-md  overflow-y-auto scrollbar-thin  scrollbar-thumb-gray-600 hover:bg-gray-500 transition duration-500 p-4">
        <PictureList pictureNames={elaset} />;
      </div>
    </div>
    
  );
}
