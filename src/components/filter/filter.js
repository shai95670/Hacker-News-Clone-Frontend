const Filter = ({ debouncedResults }) => {
  return (
    <div className="flex flex-col justify-center drop-shadow-xl gap-3 p-4 m-auto sm:m-0">
      <div className="flex justify-start gap-3 sm:flex-col">
        <input className="p-1 rounded" type="text" id="searchTerm" name="searchTerm" placeholder="Search for specific links..." onChange={debouncedResults}></input>
      </div>
    </div>
  );
};

export default Filter;