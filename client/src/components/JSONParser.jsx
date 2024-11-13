import { useEffect, useState } from "react";

function JSONMovieCollection() {
  const [movies, setMovies] = useState(null);
  const [actors, setActors] = useState(null);
  const [genres, setGenres] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const jsonData = await window.electronAPI.loadXMLDataFast();

        if (jsonData?.movieCollection) {
          const movieData = jsonData.movieCollection.movies.movie.map(
            (movie) => ({
              title: movie.title,
              year: movie.year,
              director: movie.director,
              genre:
                jsonData.movieCollection.genres.genre.find(
                  (genre) => genre.id === movie.genreId
                )?.name || "Unknown Genre",
              actors: movie.actors.actor.map(
                (actorRef) =>
                  jsonData.movieCollection.actors.actor.find(
                    (actor) => actor.id === actorRef.actorId
                  ) || { name: "Unknown Actor", nationality: "Unknown" }
              ),
            })
          );

          const actorData = jsonData.movieCollection.actors.actor;
          const genreData = jsonData.movieCollection.genres.genre;
          const directorsData = Array.from(
            new Set(movieData.map((movie) => movie.director))
          );

          setMovies(movieData);
          setActors(actorData);
          setGenres(genreData);
          setDirectors(directorsData);
        } else {
          console.error("Invalid JSON structure:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchJSONData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Fast XML Parser</h1>
      <p className='mt-4 mb-4'>
        This component uses `fast-xml-parser` to parse XML into JSON, making
        data handling easier.
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

export default JSONMovieCollection;
