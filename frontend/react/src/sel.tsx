import React, { useState, useRef, useEffect, useContext, createContext } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import { elas } from "./App";
import { searches } from "./api";


interface Feature {
  vector: number[];
}

interface SearchResult {
  hits: {
    hits:{
      _id: string;
      _source: {url :string};
    }[];
  };
}
export function Sel({}) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [img, setimg] = useState<File>();
  const [base64, setb] = useState<string>("");
  const [feature , setfeature] = useState<{vector : Array<number>}>()
  const elaset = useContext(elas)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setimg(file);
      fileToBase64(file).then((base64String) => {
        setb(base64String);
      });
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file selected.");
      }
      const nnf: File = file;
      const reader = new FileReader();
      reader.readAsDataURL(nnf);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleButtonClick = () => {
    fileUploadRef.current?.click();
  };

  const sendclick = () => {
    console.log(base64);
    axios
      .post<Feature>("http://localhost:5000/predict", { data: base64 })
      .then((response) => {
        console.log(response.data);
        const feature = response.data;
        setfeature(feature);
        if (feature !== undefined) {
          return axios.post<SearchResult>(
            `http://localhost:9200/pic/_search`,
            {
              knn: {
                field: "crd",
                query_vector: feature.vector,
                k: 10,
                num_candidates: 100
              },
              _source: ["_id", "url"]
            }
          );
        } else {
          return undefined;
        }
      })
      .then((result: AxiosResponse<SearchResult> | undefined) => {
        if (result !== undefined) {
          const hits = result.data.hits.hits.map((hit)=> hit._source.url);
          console.log(hits);
          elaset.setoutput(hits)
          console.log("elaset stuff :"+ elaset.output)
        }
      })
      .catch((error) => console.error(error));
  };;

  return (
    <div className="rounded-md bg-gray-500 hover:bg-gray-400 h-4/5 p-5 w-1/4 mr-4 transition duration-500 ">
      <h2 className="text-2xl font-bold m-5 text-slate-900">
        PICK A PICTURE :
      </h2>
      {img && img.type.startsWith("image/") ? (
        <img
          src={URL.createObjectURL(img)}
          alt="Selected file"
          className=" m-5 rounded-md w-5/6"
          onClick={handleButtonClick}
        />
      ) : (
        <img
          id="img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Black.png/220px-Black.png"
          className=" m-5 rounded-md w-5/6 "
          onClick={handleButtonClick}
        />
      )}

      <div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          ref={fileUploadRef}
          onChange={handleFileChange}
        />

        <button
          id="up"
          className=" rounded-md bg-gray-500 hover:bg-gray-700 px-5 py-3 m-5 transition duration-500 text-gray-500 hover:text-gray-200 font-bold mb-4 "
          onClick={sendclick}
        >
          Send
        </button>
      </div>
    </div>
  );
}
