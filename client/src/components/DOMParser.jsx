import { useEffect, useState } from "react";

function DOMMovieCollection() {
  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState(null);
  const [genres, setGenres] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchXMLData = async () => {
      const data = await window.electronAPI.loadXMLData();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "application/xml");

      // Extract actor details and create a map for quick access
      const actorElements = Array.from(doc.getElementsByTagName("actor"));
      const actorData = actorElements
        .map((actor) => ({
          id: actor.getAttribute("id"),
          name: actor.getElementsByTagName("name")[0]?.textContent || "",
          nationality:
            actor.getElementsByTagName("nationality")[0]?.textContent || "",
        }))
        .filter((actor) => actor.name && actor.nationality);

      const actorMap = Object.fromEntries(
        actorData.map((actor) => [actor.id, actor])
      );

      // Extract genre details and create a map for quick access
      const genreElements = Array.from(doc.getElementsByTagName("genre"));
      const genreData = genreElements.map((genre) => ({
        id: genre.getAttribute("id"),
        name: genre.getElementsByTagName("name")[0]?.textContent || "",
        description:
          genre.getElementsByTagName("description")[0]?.textContent || "",
      }));
      const genreMap = Object.fromEntries(
        genreData.map((genre) => [genre.id, genre.name])
      );

      // Extract movie details and link actors and genres based on references
      const movieElements = Array.from(doc.getElementsByTagName("movie"));
      const movieData = movieElements.map((movie) => ({
        title: movie.getElementsByTagName("title")[0].textContent,
        year: movie.getElementsByTagName("year")[0].textContent,
        director: movie.getElementsByTagName("director")[0].textContent,
        genre: genreMap[movie.getAttribute("genreId")] || "Unknown Genre",
        actors: Array.from(movie.getElementsByTagName("actorRef")).map(
          (actorRef) =>
            actorMap[actorRef.textContent] || {
              name: "Unknown Actor",
              nationality: "Unknown",
            }
        ),
      }));

      // Extract unique directors
      const directorsData = Array.from(
        new Set(movieData.map((movie) => movie.director))
      );

      // Set state with extracted data
      setMovies(movieData);
      setActors(actorData);
      setGenres(genreData);
      setDirectors(directorsData);
    };

    fetchXMLData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold'>DOMParser</h1>
      <p className='mt-4 '>
        The DOMParser in this component processes XML data by transforming it
        into a DOM (Document Object Model) structure, allowing direct access to
        XML elements and attributes, similar to navigating HTML in the browser.
      </p>
      <div>
        <div
          className='mb-5 mt-2 cursor-pointer text-blue-500 text-lg hover:underline'
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Click to hide info" : "Click for more info"}
        </div>

        <div
          className={`my-5 transition-all duration-300 ease-out ${
            showMore
              ? "opacity-100 max-h-screen"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <h2 className='text-xl font-semibold mb-2'>DOMParser Methods</h2>

          <ul className='list-disc list-inside space-y-2'>
            <li>
              <strong>getElementsByTagName:</strong> Searches within the XML
              document for all elements of a given tag name, allowing us to
              extract <code>&lt;actor&gt;</code>, <code>&lt;genre&gt;</code>,
              and <code>&lt;movie&gt;</code> elements as needed.
            </li>
            <li>
              <strong>getAttribute:</strong> Accesses an attribute (like{" "}
              <code>id</code> or <code>genreId</code>) within an XML element.
            </li>
            <li>
              <strong>textContent:</strong> Retrieves the text inside an XML
              element, allowing easy access to element contents, such as{" "}
              <code>&lt;name&gt;</code> or <code>&lt;description&gt;</code>.
            </li>
          </ul>
        </div>
      </div>

      <div className='mb-4 flex space-x-2'>
        {["movies", "actors", "genres", "directors"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 m-1 rounded text-white transition-all duration-300 transform ${
              selectedCategory === category
                ? "bg-blue-700 scale-105 shadow-lg"
                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {selectedCategory === "movies" && (
        <div className='transition-opacity duration-500 ease-out opacity-100'>
          <h3 className='text-lg font-semibold underline'>Movies</h3>
          <ul className='grid grid-cols-2 gap-10 mt-5'>
            {movies &&
              movies.map((movie, index) => (
                <li
                  key={index}
                  className='border p-4 rounded shadow-lg bg-white transition-all transform duration-300 hover:scale-105 opacity-0 animate-fadeIn'
                >
                  <strong className='text-xl'>{movie.title}</strong> <br />
                  <strong>Year:</strong> {movie.year} <br />
                  <strong>Director:</strong> {movie.director} <br />
                  <strong>Genre:</strong> {movie.genre} <br />
                  <strong>Actors:</strong>
                  <ul className='ml-4 mt-2'>
                    {movie.actors.map((actor, i) => (
                      <li key={i}>
                        {actor.name} ({actor.nationality})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      )}

      {selectedCategory === "actors" && (
        <div className='transition-opacity duration-500 ease-out opacity-100'>
          <h3 className='text-lg font-semibold underline'>Actors</h3>
          <ul className='grid grid-cols-2 gap-10 mt-5'>
            {actors &&
              actors.map((actor, index) => (
                <li
                  key={index}
                  className='border p-4 rounded shadow-lg bg-white transition-all transform duration-300 hover:scale-105 opacity-0 animate-fadeIn'
                >
                  <strong>Name:</strong> {actor.name} <br />
                  <strong>Nationality:</strong> {actor.nationality}
                </li>
              ))}
          </ul>
        </div>
      )}

      {selectedCategory === "genres" && (
        <div className='transition-opacity duration-500 ease-out opacity-100'>
          <h3 className='text-lg font-semibold underline'>Genres</h3>
          <ul className='grid grid-cols-2 gap-10 mt-5'>
            {genres &&
              genres.map((genre, index) => (
                <li
                  key={index}
                  className='border p-4 rounded shadow-lg bg-white transition-all transform duration-300 hover:scale-105 opacity-0 animate-fadeIn'
                >
                  <strong>Name:</strong> {genre.name} <br />
                  <strong>Description:</strong> {genre.description}
                </li>
              ))}
          </ul>
        </div>
      )}

      {selectedCategory === "directors" && (
        <div className='transition-opacity duration-500 ease-out opacity-100'>
          <h3 className='text-lg font-semibold underline'>Directors</h3>
          <ul className='grid grid-cols-2 gap-10 mt-5'>
            {directors &&
              directors.map((director, index) => (
                <li
                  key={index}
                  className='border p-4 rounded shadow-lg bg-white transition-all transform duration-300 hover:scale-105 opacity-0 animate-fadeIn'
                >
                  <strong>Director:</strong> {director}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DOMMovieCollection;
