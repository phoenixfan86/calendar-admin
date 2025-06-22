import "./Header.css";
import Mail from "./Mail";
import Notification from "./Notification";
import Search from "./Search";
import Shedule from "./Shedule";

interface HeaderProps {
  activeLabel: string;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
}

const Header = ({ activeLabel, isVisible, setIsVisible }: HeaderProps) => {

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
      <div className="headerMenu">
        <div className="burgerMenu" onClick={() => setIsVisible(!isVisible)}>
          <span></span>
        </div>
        <div className="headerTitle">
          <h1>{activeLabel}</h1>
        </div>
      </div>
      <Search />
      <div className="iconArea">
        <Notification />
        <Mail />
        <Shedule />
      </div>
      <div className="userWrapper">
        <div className="userData">
          <h4>Connie Springer</h4>
          <span className="body-2">connieganteng@mail.com</span>
        </div>
        <div className="avatar"></div>
        <div className="lang">
          <select name="lang" id="lang" className="h5">
            <option value="en" selected>EN</option>
            <option value="de">DE</option>
          </select>
        </div>
      </div>

    </header>
  );
}
export default Header;