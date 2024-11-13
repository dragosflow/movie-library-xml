/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const XMLCodeHighlight = ({ xmlCode }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>XML Database</h2>
      <SyntaxHighlighter language='xml'>{xmlCode}</SyntaxHighlighter>
    </div>
  );
};

export default XMLCodeHighlight;
