import "./Search.css"

const Search = () => {
  return (
    <div className="searchWrapper">
      <form action="" className="searchForm">
        <input type="text" placeholder="Search here..." className="searchInput body-2" />
        <button className="searchBtn">
          <img src="./images/icons/Search.png" alt="" />
        </button>
      </form>
    </div>
  );
}
export default Search;