/* eslint-disable react/prop-types */
const BackButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex rounded-full cursor-pointer border-2 border-blue-500 w-fit p-1'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={3}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5 8.25 12l7.5-7.5'
        />
      </svg>
    </div>
  );
};

export default BackButton;
