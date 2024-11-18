import { useState } from "react";
import XMLCodeHighlight from "./XMLCodeHighlight";
import { xmlschema, xml1 } from "../utils/data";
import ValidateDatabase from "./ValidateDatabase";

export const Homework2 = () => {
  const [activeTab, setActiveTab] = useState("TestXML");

  return (
    <div>
      <div className='flex w-fit relative items-center mt-5 mb-8'>
        <a
          href={`/public/docs/homework2.docx`}
          download={`homework2.docx`}
          className='text-5xl peer font-bold  hover:opacity-80  cursor-pointer'
        >
          #2
        </a>
        <div className='peer-hover:opacity-100 select-none opacity-0 transition duration-300  text-sm ml-3 text-blue-500'>
          click to download document
        </div>
      </div>

      <div className='flex  space-x-4 my-4 mb-10'>
        <button
          onClick={() => setActiveTab("TestXML")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "TestXML"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          Test XML
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
        <button
          onClick={() => setActiveTab("XMLSchema")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "XMLSchema"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          XML Schema
        </button>
      </div>

      <div>
        {activeTab === "TestXML" && <ValidateDatabase />}
        {activeTab === "XMLDatabase" && <XMLCodeHighlight xmlCode={xml1} />}
        {activeTab === "XMLSchema" && <XMLCodeHighlight xmlCode={xmlschema} />}
      </div>
    </div>
  );
};

export default Homework2;
