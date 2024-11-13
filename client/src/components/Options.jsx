/* eslint-disable react/prop-types */
function Options({ onClick }) {
  return (
    <div className='flex flex-col items-center justify-between h-screen -m-[2.5rem] pb-3 bg-gray-50'>
      <div className='flex h-full  flex-col justify-center items-center'>
        <h1 className='text-5xl font-extrabold mb-20 text-center text-blue-600'>
          XML Movies Library
        </h1>

        <div className='flex space-x-6'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              onClick={() => onClick(index + 1)}
              key={index}
              className='bg-white hover:cursor-pointer shadow-md rounded-xl w-48 h-32  flex items-center justify-center text-lg font-semibold text-gray-800 
            border border-blue-400 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-blue-500 hover:text-white'
            >
              Homework #{index + 1}
            </div>
          ))}
        </div>
      </div>
      <div>Dragos Florea</div>
    </div>
  );
}

export default Options;
