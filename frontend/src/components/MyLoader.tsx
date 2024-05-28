const MyLoader = () => {
  return (
    <div className="flex flex-col w-full items-center animate-pulse">
      <div className="w-full lg:w-6/12">
        <div className="mt-3 border-b-2 p-2 w-full">
          <div className="mr-2 flex items-center">
            <div className="mr-2">
              <div className="w-8 h-8 rounded-2xl bg-gray-200"></div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-2.5 bg-gray-200 rounded w-1/4 ml-2"></div>
          </div>
          <div className="h-2.5 bg-gray-200 rounded w-1/2 mt-2"></div>
          <div className="h-2.5 bg-gray-200 rounded w-full mt-2"></div>
          <div className="h-2.5 bg-gray-200 rounded w-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MyLoader;
