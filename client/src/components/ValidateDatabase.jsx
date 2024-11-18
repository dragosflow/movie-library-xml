import { useState } from "react";

function ValidateDatabase() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState("Default XML");
  const [isLoading, setIsLoading] = useState(false);

  const openFileDialog = async () => {
    const { canceled, filePaths } = await window.electronAPI.showOpenDialog();
    if (canceled || filePaths.length === 0) {
      return null;
    }
    return filePaths[0];
  };

  const validateXMLFile = async (filePath = null) => {
    setIsLoading(true);

    if (!filePath) {
      setFileName("Default XML");
    } else {
      setFileName(filePath.split("/").pop());
    }

    const result = await window.electronAPI.validateXMLWithDOMParser(filePath);
    console.log(result);
    setValidationResult(result);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFileChange = async () => {
    const selectedFilePath = await openFileDialog();
    if (selectedFilePath) {
      validateXMLFile(selectedFilePath);
    }
  };

  return (
    <div className='flex flex-col w-fit'>
      <h1 className='text-3xl font-bold text-blue-600 mb-8'>
        XML Validation with DOMParser
      </h1>

      <div className='flex items-center space-x-4 mb-6'>
        <button
          onClick={() => validateXMLFile()}
          className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Validate current XML
        </button>
        <p className='px-5'> or </p>
        <button
          onClick={handleFileChange}
          className='px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400'
        >
          Choose File
        </button>
        <span className='text-sm text-gray-600 italic'>{fileName}</span>
      </div>

      {isLoading && (
        <div className='mt-4 text-blue-600 font-semibold text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 mx-auto mb-4'></div>
          Validating...
        </div>
      )}

      {!isLoading && validationResult && (
        <div className='mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800'>
          <h2 className='text-xl font-semibold text-blue-600 mb-4'>
            Validation Result
          </h2>

          {validationResult.valid ? (
            <p className='text-green-600'>{validationResult.message}</p>
          ) : (
            <div>
              <p className='text-red-600 font-semibold mb-2'>
                {validationResult.message}
              </p>
              <ul className='space-y-4'>
                {validationResult?.errors?.map((error, index) => (
                  <li
                    key={index}
                    className='bg-red-100 p-4 rounded-md border-l-4 border-red-500'
                  >
                    <p className='text-red-600 font-medium'>
                      {error.loc.fileName} - Line {error.loc.lineNumber}:
                    </p>
                    <p className='text-red-500'>{error.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ValidateDatabase;
