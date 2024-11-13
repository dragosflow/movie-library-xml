import { useEffect, useState } from "react";

function DOMMovieCollection() {
  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState(null);
  const [genres, setGenres] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchXMLData = async () => {
      const data = await window.electronAPI.loadXMLData();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "application/xml");

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

      const movieElements = Array.from(doc.getElementsByTagName("movie"));
      const movieData = movieElements.map((movie) => ({
        title: movie.getElementsByTagName("title")[0].textContent,
        year: movie.getElementsByTagName("year")[0].textContent,
        director: movie.getElementsByTagName("director")[0].textContent,
        genre: genreMap[movie.getAttribute("genreId")] || "Unknown Genre",
        actors: Array.from(movie.getElementsByTagName("actor")).map(
          (actor) =>
            actorMap[actor.getAttribute("actorId")] || {
              name: "Unknown Actor",
              nationality: "Unknown",
            }
        ),
      }));

      const directorsData = Array.from(
        new Set(movieData.map((movie) => movie.director))
      );

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
      <p className='mt-4 mb-4'>
        The DOMParser is used to parse XML strings into a DOM structure,
        allowing us to navigate the data using familiar methods like{" "}
        <code>getElementsByTagName</code> and access attributes and nested
        elements. Here, we use it to parse and display a movie collection with
        actors, movies, genres, and directors.
      </p>

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
