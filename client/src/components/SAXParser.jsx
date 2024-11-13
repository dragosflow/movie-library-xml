import { useEffect, useState } from "react";

function SAXMovieCollection() {
  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState(null);
  const [genres, setGenres] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electronAPI.loadXMLDataSax();
      console.log("SAX Parsed Data:", data);

      const genreMap = Object.fromEntries(
        data.genres.map((genre) => [genre.id, genre.name])
      );
      const actorMap = Object.fromEntries(
        data.actors.map((actor) => [actor.id, actor])
      );

      const movieData = data.movies.map((movie) => ({
        ...movie,
        genre: genreMap[movie.genreId] || "Unknown Genre",
        actors: movie.actors.map(
          (actorRef) =>
            actorMap[actorRef.actorId] || {
              name: "Unknown Actor",
              nationality: "Unknown",
            }
        ),
      }));

      setMovies(movieData);
      setActors(data.actors);
      setGenres(data.genres);
      setDirectors([...new Set(movieData.map((movie) => movie.director))]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold'>SAX Parser</h1>
      <p className='mt-4 '>
        This component uses the <code>sax</code> library to parse XML data as a
        stream, processing each XML element sequentially as it’s read. Unlike
        traditional XML parsing, which loads the entire XML document into
        memory, <code>sax</code> processes the data one element at a time. This
        approach is more efficient, especially for large XML files, as it
        reduces memory usage.
      </p>
      <div
        className='mb-5 mt-2 cursor-pointer text-blue-500 text-lg hover:underline'
        onClick={() => setShowMore(!showMore)}
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
        <h2 className='text-xl font-semibold mb-2'>SAXParser Methods</h2>

        <ul className='list-disc list-inside space-y-2'>
          <li>
            <strong>onopentag:</strong> Triggered when the parser encounters an
            opening tag. This allows you to initialize objects for elements like{" "}
            <code>&lt;movie&gt;</code> or <code>&lt;actor&gt;</code>, setting up
            storage for their data.
          </li>
          <li>
            <strong>ontext:</strong> Called when the parser encounters text
            within an element. This lets you capture the content, such as movie
            titles or actor names, storing it in the current object.
          </li>
          <li>
            <strong>onclosetag:</strong> Triggered when a closing tag is
            encountered. At this point, you can finalize the current object, for
            example, adding a fully populated movie to the movies list.
          </li>
          <li>
            <strong>onend:</strong> Called once the parser reaches the end of
            the XML document. This marks the completion of parsing, and you can
            now return or use the fully structured data.
          </li>
        </ul>
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

export default SAXMovieCollection;
