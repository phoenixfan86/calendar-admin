import "./Notification.css";
import type { NotificationProps } from "../../types/NotificationProps";

const Notification = ({ unreadCount = 0 }: NotificationProps) => {
  return (
    <div className="notifiWrapper">
      <div className="notifiIcons">
        <img src="./images/icons/notification.png" alt="notification" />
        {unreadCount > 0 && (
          <div className="unread body-1">12</div>
        )}
      </div>
    </div>
  );
}
export default Notification;