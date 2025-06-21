
import "./EventListModal.css"
import React from 'react';
import { format } from 'date-fns';
import type { Event } from '../../types/EventProps';



interface EventListModalProps {
  date: Date
  events: Event[]
  onClose: () => void
  onAddNew: () => void
  onDelete: (id: string) => void
  onConfirm: (id: string) => void
  onEdit: (id: string) => void
}

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
      <div className="modal">
        <div className="modalHeader">
          <h2>Події на {format(date, 'MMMM do, yyyy')}</h2>
          <button className="closeBtn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modalBody">
          <button className="addBtn" onClick={onAddNew}>
            + Нова подія
          </button>

          {events.length === 0 ? (
            <p>Немає подій на цей день</p>
          ) : (
            <ul className="eventList">
              {events.map((event) => (
                <li className="eventItem" key={event.id}>
                  <div className="eventHeader">
                    <h3>{event.title}</h3>
                    <div className="eventMenu">
                      <button onClick={() => onEdit(event.id)}>⋮</button>
                    </div>
                  </div>

                  <p className="eventDescription">{event.description}</p>

                  <p className="eventTime">
                    {format(new Date(event.start), 'MMM d, yyyy • h:mm aa')}
                  </p>

                  <div className="eventFooter">
                    <div className="users">
                      {event.users?.map((user, idx) => (
                        <img
                          key={idx}
                          src={user}
                          alt="User"
                          className="userIcon"
                        />
                      ))}
                    </div>

                    <div className="actions">
                      <button onClick={() => onConfirm(event.id)}>✅ Підтвердити</button>
                      <button onClick={() => onDelete(event.id)}>🗑️ Стерти</button>
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
