import './Sidebar.css';
import type { MenuItemsProps } from '../../types/MenuItemsProps';

const Sidebar = () => {

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
    <section className="sidebar">
      <h4 className="sidebarTitle">Main menu</h4>
      <nav>
        <ul className="mainMenu">
          {menuItems.map(({ label, link, icon }, key) => (
            <li key={key} className="menuItems">
              <i className={`fa-solid ${icon}`}></i>
              <a href={link} className="h4">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </section >
  );
}
export default Sidebar;

