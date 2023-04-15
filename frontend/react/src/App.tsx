import { Out } from "./out";
import { Sel } from "./sel";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

type modeloutput = {
  output: { vector: Array<number> };
  setoutput: React.Dispatch<React.SetStateAction<{ vector: Array<number> }>>;
};


export const elas = React.createContext<modeloutput>({
  output: { vector: new Array(1000) },
  setoutput: () => {},
});


function App() {

  const [output, setoutput] = useState<{ vector: Array<number> }>({ vector: new Array(1000) });

  return (
    <elas.Provider value = {{output,setoutput}}>
 
    <div className="app relative flex justify-center items-center bg-slate-900">
      <div className="flex justify-center items-center w-3/4 h-screen ">
        <Sel />
        <Out />
      </div>

      <div className="absolute bottom-0 right-0 bg-white  rounded-md flex justify-center p-1 w-1/5 items-center  ">
        <img
          src="https://www.ensab.ac.ma/Site/assets/images/ensa.png"
          width={190}
        />
        <h1>
          <b>Done by :</b>
          <br /> Hamza Kharbouch
        </h1>
      </div>
    </div>

    </elas.Provider>
  );
}

export default App;
