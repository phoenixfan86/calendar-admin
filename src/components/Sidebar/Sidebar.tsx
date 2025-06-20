import './Sidebar.css';
import { useState } from 'react';
import type { MenuItemsProps } from '../../types/MenuItemsProps';

interface SidebarProps {
  setActiveLabel: (label: string) => void;
  isVisible: boolean;
}

const Sidebar = ({ isVisible, setActiveLabel }: SidebarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems: MenuItemsProps[] = [
    {
      label: "Dashboard",
      link: "#",
      icon: "fa-house"
    },
    {
      label: "Calendar",
      link: "#",
      icon: "fa-calendar"
    },
    {
      label: "Event",
      link: "#",
      icon: "fa-bolt-lightning"
    },
    {
      label: "Analytics",
      link: "#",
      icon: "fa-chart-pie"
    },
    {
      label: "Kanban",
      link: "#",
      icon: "fa-table-cells-large"
    },
  ]

  return (
    <section className={`sidebar ${isVisible ? "visible" : ""}`}>
      <h4 className="sidebarTitle">Main menu</h4>
      <nav>
        <ul className="mainMenu">
          {menuItems.map(({ label, link, icon }, key) => (
            <li
              key={key}
              className={`menuItems ${activeIndex === key ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(key);
                setActiveLabel(label)
              }}
            >
              <i className={`fa-solid ${icon}`}></i>
              <a href={link} className="h4">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="banner">
        <img src="./images/illustration.png" alt="Baner Img" />
        <div className="bannerContent">
          <h4 className="primaryText">Manage your schedule right now</h4>
          <p className="subtitle primaryText">Our AI systems will create report automatically for your event this month</p>
          <button className="bannerBtn">
            <span className="body-1">OK, Lets go</span>
          </button>
        </div>
      </div>
      <div className="copyright">
        <h6 className="primaryText">Kapan Calendar Admin</h6>
        <p className="subtitle secondaryText">© 2020 All Rights Reserved</p>
        <p className="body-2 secondaryText">Made with ♥ by Peterdraw</p>
      </div>
    </section >
  );
}
export default Sidebar;

