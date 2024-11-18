import { useState } from "react";

function XPathExpressions() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExpression, setSelectedExpression] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const expressions = {
    simple: [
      {
        expression: "/movieCollection/movies/movie/title",
        explanation: "Fetches all movie titles in the collection.",
      },
      {
        expression: "/movieCollection/actors/actor/name",
        explanation: "Retrieves names of all actors.",
      },
      {
        expression: "//genre/name",
        explanation: "Fetches genre names across the document.",
      },
      {
        expression: "/movieCollection/actors/actor/nationality",
        explanation: "Retrieves the nationality of each actor.",
      },
      {
        expression: "//movie[@id]",
        explanation: "Selects all movie elements that have an 'id' attribute.",
      },
      {
        expression: "/movieCollection/genres/genre/description",
        explanation: "Fetches all genre descriptions.",
      },
      {
        expression: "/movieCollection/movies/movie/director",
        explanation: "Fetches all director names.",
      },
      {
        expression: "/movieCollection/movies/movie/actors/actorRef",
        explanation: "Fetches all actors in a movie.",
      },
    ],
    medium: [
      {
        expression: "//movie[year='1994']/title",
        explanation: "Fetches titles of movies released in 1994.",
      },
      {
        expression: "//actor[name='Tim Robbins']/nationality",
        explanation: "Gets the nationality of actor Tim Robbins.",
      },
      {
        expression: "//genre[name='Drama']/description",
        explanation: "Retrieves the description for the Drama genre.",
      },
      {
        expression: "//movie[actors/actorRef='a1']/title",
        explanation: "Fetches titles of movies with actorRef 'a1'.",
      },
      {
        expression: "//movie[director='Christopher Nolan']/title",
        explanation: "Fetches titles of movies directed by Christopher Nolan.",
      },
      {
        expression: "//actor[nationality='American']/name",
        explanation: "Retrieves names of American actors.",
      },
      {
        expression: "//movie[@genreId='g1']/title",
        explanation: "Fetches titles of movies with genre 'g1'.",
      },
      {
        expression: "//actor[nationality='Australian']/name",
        explanation: "Fetches names of Australian actors.",
      },
    ],
    complex: [
      {
        expression:
          "//movie[actors/actorRef=/movieCollection/actors/actor[name='Tim Robbins']/@id]/title",
        explanation: "Fetches titles of movies featuring Tim Robbins.",
      },
      {
        expression:
          "/movieCollection/genres/genre[@id=//movie[director='Christopher Nolan']/@genreId]/name",
        explanation:
          "Fetches genre names for all movies directed by Christopher Nolan.",
      },
      {
        expression:
          "/movieCollection/actors/actor[@id=//movie[director='Frank Darabont']/actors/actorRef]/name",
        explanation:
          "Fetches names of actors in movies directed by Frank Darabont.",
      },
      {
        expression: "//genre[contains(description, 'emotional')]",
        explanation: "Selects genres with descriptions mentioning 'emotional'.",
      },
      {
        expression: "//movie[year >= 2000 and year <= 2009]/title",
        explanation: "Fetches titles of movies from the 2000s.",
      },
      {
        expression: "//movie[title and director='Frank Darabont']/title",
        explanation: "Fetches titles of movies directed by Frank Darabont.",
      },
      {
        expression:
          "/movieCollection/actors/actor[@id=//movie[title='The Dark Knight']/actors/actorRef]/name",
        explanation: "Fetches names of actors in 'The Dark Knight'.",
      },
      {
        expression:
          "/movieCollection/genres/genre[@id=//movie[actors/actorRef=/movieCollection/actors/actor[name='Morgan Freeman']/@id]/@genreId]/name",
        explanation: "Fetches genres of movies featuring Morgan Freeman.",
      },
    ],
  };

  const handleExpressionClick = async (expression) => {
    setSelectedExpression(expression.expression);
    const result = await window.electronAPI.runXpathQuery({
      expression: expression.expression,
    });
    setQueryResult(result.success ? result.result : result.error);
  };

  const renderExpressions = (expressionsList, category) => (
    <div className='w-full mb-6 '>
      <button
        onClick={() =>
          setSelectedCategory((prev) => (prev === category ? null : category))
        }
        className='w-full text-left px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-800 focus:outline-none transition duration-200'
      >
        {category.charAt(0).toUpperCase() + category.slice(1)} Expressions
      </button>
      <div
        className={`${
          selectedCategory === category ? "block" : "hidden"
        }  transition-all duration-500 ease-in-out mt-4 bg-gray-50 p-4 rounded-md shadow-sm`}
      >
        {expressionsList.map((exp, index) => (
          <button
            key={index}
            onClick={() => handleExpressionClick(exp)}
            className='block overflow-x-auto w-full text-left p-3 mb-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-500 transition'
          >
            <span className='block text-blue-600 font-semibold mb-1'>
              XPath Expression:
            </span>
            <span className='block text-xs font-mono text-gray-600 mb-1'>
              {exp.expression}
            </span>
            <p className='text-sm text-gray-500'>{exp.explanation}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className='flex flex-col lg:flex-row items-start w-full  space-y-8 lg:space-y-0 lg:space-x-8'>
      <div className='lg:w-1/2'>
        <h1 className='text-3xl font-bold text-blue-600 mb-6'>
          XPath Expressions
        </h1>
        {Object.entries(expressions).map(([category, expressionsList]) =>
          renderExpressions(expressionsList, category)
        )}
      </div>

      {selectedExpression && (
        <div className='lg:w-1/2 lg:sticky top-20 p-6 bg-blue-50 rounded-md shadow-lg text-gray-800'>
          <h2 className='text-2xl font-semibold text-blue-600 mb-4'>
            Query Result for:
          </h2>
          <p className='font-mono text-blue-800 italic mb-4 bg-gray-100 p-2 rounded text-sm overflow-auto'>
            {selectedExpression}
          </p>
          {queryResult ? (
            typeof queryResult === "string" ? (
              <p className='text-red-600'>{queryResult}</p>
            ) : (
              <pre className='bg-white p-4 rounded-md text-sm max-h-96 overflow-y-auto border border-gray-200'>
                {JSON.stringify(queryResult, null, 2)}
              </pre>
            )
          ) : (
            <p className='text-gray-600'>No result found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default XPathExpressions;
