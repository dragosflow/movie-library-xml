import { useState } from "react";

function XPathQuery() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const runXPathQuery = async () => {
    const queryResult = await window.electronAPI.runXpathQuery({
      expression,
    });
    setResult(
      queryResult.success ? queryResult.result : { error: queryResult.error }
    );
  };

  return (
    <div className='flex flex-col w-full max-w-lg '>
      <h1 className='text-3xl font-bold text-blue-600 mb-8'>Run XPath Query</h1>

      <div className='flex flex-col w-full'>
        <input
          type='text'
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder='Enter XPath expression'
          className='px-4 py-2 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
        />

        <button
          onClick={runXPathQuery}
          className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Run Query
        </button>
      </div>

      {result && (
        <div className='mt-8 bg-white p-6 rounded-lg shadow-lg w-full text-gray-800'>
          <h2 className='text-xl font-semibold text-blue-600 mb-4'>Result</h2>
          {result.error ? (
            <p className='text-red-600 font-semibold'>{result.error}</p>
          ) : (
            <ul className='bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-64'>
              {Array.isArray(result) ? (
                result.map((item, index) => (
                  <li key={index} className='mb-2'>
                    <strong>Result {index + 1}:</strong>{" "}
                    {JSON.stringify(item, null, 2)}
                  </li>
                ))
              ) : typeof result === "object" ? (
                Object.entries(result).map(([key, value], index) => (
                  <li key={index} className='mb-2'>
                    <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
                  </li>
                ))
              ) : (
                <pre>{JSON.stringify(result, null, 2)}</pre>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default XPathQuery;
