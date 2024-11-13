import { useState } from "react";
import DOMMovieCollection from "./DOMParser";
import JSONMovieCollection from "./JSONParser";
import SAXMovieCollection from "./SAXParser";
import XMLCodeHighlight from "./XMLCodeHighlight";
import { xml1 } from "../utils/data";

export const Homework1 = () => {
  const [activeTab, setActiveTab] = useState("DOMParser");

  return (
    <div>
      <div className='flex w-fit relative items-center mt-5 mb-8'>
        <a
          href={`/public/docs/homework1.docx`}
          download={`homework1.docx`}
          className='text-5xl peer font-bold  hover:opacity-80  cursor-pointer'
        >
          #1
        </a>
        <div className='peer-hover:opacity-100 select-none opacity-0 transition duration-300  text-sm ml-3 text-blue-500'>
          click to download document
        </div>
      </div>

      <div className='flex  space-x-4 my-4 mb-10'>
        <button
          onClick={() => setActiveTab("DOMParser")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "DOMParser"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          DOM Parser
        </button>
        <button
          onClick={() => setActiveTab("SaxParser")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "SaxParser"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          SAX Parser
        </button>
        <button
          onClick={() => setActiveTab("FastParser")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "FastParser"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          Fast Parser
        </button>
        <button
          onClick={() => setActiveTab("XMLDatabase")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "XMLDatabase"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          XML Database
        </button>
      </div>

      <div>{activeTab === "DOMParser" && <DOMMovieCollection />}</div>
      <div>{activeTab === "SaxParser" && <SAXMovieCollection />}</div>
      <div>{activeTab === "FastParser" && <JSONMovieCollection />}</div>
      <div>
        {activeTab === "XMLDatabase" && <XMLCodeHighlight xmlCode={xml1} />}
      </div>
    </div>
  );
};

export default Homework1;
