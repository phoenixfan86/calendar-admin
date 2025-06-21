
import "./EventListModal.css";
import React from 'react';
import { format } from 'date-fns';
import type { EventListModalProps } from '../../types/EventProps';


const EventListModal: React.FC<EventListModalProps> = ({
  date,
  events,
  onClose,
  onAddNew,
  onDelete,
  onConfirm,
  onEdit,
}) => {
  return (
    <div className="modalWrapper">
      <div className="eventListModal shadow">
        <div className="modalHeader">
          <div className="modalTitle">
            <h2 className="primaryText">Event Detail</h2>
            <p className="body-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="modalHeaderBtn">
            <button className="primaryBtn" onClick={onAddNew}>
              <span className="body-1">+New Event</span>
            </button>
            <div className="closeBtn" onClick={onClose}>
              <img src="./images/icons/xmark.png" alt="closeBtn" />
            </div>
          </div>
        </div>
        <div className="eventModalBody">
          {events.length === 0 ? (
            <p>No event on this day</p>
          ) : (
            <ul className="eventList">
              {events.map((event) => (
                <li className="eventItem" key={event.id}>
                  <div className="itemIcon">
                    <div className="iconWrapper">
                      <i className="fa-solid fa-calendar"></i>
                    </div>
                  </div>
                  <div className="itemContent">
                    <div className="eventHeader">
                      <h3 className="primaryText">{event.title}</h3>
                      <div className="eventActions">
                        <div onClick={() => onDelete(event.id)} className="delBtn">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div onClick={() => onConfirm(event.id)} className="checkBtn">
                          <i className="fa-solid fa-check"></i>
                        </div>
                        <div onClick={() => onEdit(event.id)} className="otherBtn">
                          <i className="fa-solid fa-ellipsis"></i>
                        </div>
                      </div>
                    </div>
                    <p className="body-2 secondaryText">{event.description}</p>
                    <div className="eventFooter">
                      <div className="eventFooterUsers">
                        {event.users?.map((user, idx) => (
                          <img
                            key={idx}
                            src={user}
                            alt="User"
                            className="userIcon"
                          />
                        ))}
                        <div className="userAvatar"></div>
                        <div className="userAvatar"></div>
                        <div className="userAvatar"></div>
                        <div className="userAvatar"></div>
                        <div className="userAvatar">
                          <span><h5>5+</h5></span>
                        </div>
                      </div>
                      <div className="eventFooterData">
                        <i className="fa-solid fa-clock"></i>
                        <div className="timeWrapper">
                          <h6 className="primaryText">
                            {format(new Date(event.start), 'h:mm aa')}
                          </h6>
                          <h6 className="primaryText">
                            {format(new Date(event.start), 'MMM d, yyyy ')}
                          </h6>
                        </div>
                      </div>
                      <div className="eventFooterGeo">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="geoItem">
                          <h6 className="primaryText">Corner Rounded St
                            London, United Kingdom</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventListModal;
