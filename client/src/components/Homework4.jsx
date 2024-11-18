import { useState } from "react";
import XPathQuery from "./XpathQuery";
import XPathExpressions from "./XpathExpressions";
export const Homework2 = () => {
  const [activeTab, setActiveTab] = useState("View");

  return (
    <div>
      <div className='flex w-fit relative items-center mt-5 mb-8'>
        <a
          href={`/public/docs/homework4.docx`}
          download={`homework4.docx`}
          className='text-5xl peer font-bold  hover:opacity-80  cursor-pointer'
        >
          #4
        </a>
        <div className='peer-hover:opacity-100 select-none opacity-0 transition duration-300  text-sm ml-3 text-blue-500'>
          click to download document
        </div>
      </div>

      <div className='flex  space-x-4 my-4 mb-10'>
        <button
          onClick={() => setActiveTab("View")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "View"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          Xpath Expressions
        </button>
        <button
          onClick={() => setActiveTab("Test")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "Test"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          Xpath Query
        </button>
      </div>

      <div>
        {activeTab === "View" && <XPathExpressions />}
        {activeTab === "Test" && <XPathQuery />}
      </div>
    </div>
  );
};

export default Homework2;
