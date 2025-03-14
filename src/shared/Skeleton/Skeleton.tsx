const Skeleton = () => {
  return (
    <div className="skeleton--loader w-full">
      <div className="skeleton--loader__item grid lg:grid-cols-3 grid-cols-2 gap-4 pt-5">
        {Array.from({ length: 3 }, () => (
          <div
            key={`skeleton--item--${Math.random()}`}
            className="rounded overflow-hidden shadow-lg animate-pulse w-full mx-3"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="px-6 py-4">
              <div className="h-6 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 w-2/3"></div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
