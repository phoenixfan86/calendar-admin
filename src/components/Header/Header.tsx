import './Header.css'
import Search from './Search';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <div className="logoFirst">
          <img src="./images/icons/Calendar.png" alt="" />
        </div>
        <div className="logoSecond">
          <img src="./images/Logo.png" alt="Logo" width={90} />
          <span>Calendar Admin</span>
        </div>
      </div>
      <div className="burgerMenu">
        <span></span>
      </div>
      <div className="headerTitle">
        <h1>Calendar</h1>
      </div>
      <Search />
      <div className="iconArea">

      </div>
    </header>
  );
}
export default Header;