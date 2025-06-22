import "./Mail.css";
import type { MailProps } from "../../types/MailProps";

const Mail = ({ incoming = 0 }: MailProps) => {
  return (
    <div className="emailWrapper">
      <div className="emailIcons">
        <img src="./images/icons/email.png" alt="email" />
        {incoming > 0 && (
          <div className="unread body-1">14</div>
        )}
      </div>
    </div>
  );
}
export default Mail;