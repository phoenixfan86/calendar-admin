import "./Sheduler.css"
import type { CalendarEvent } from "../../types/EventProps"

interface SchedulerProps {
  date: Date
  events: CalendarEvent[]
  onAdd: (startTime: Date) => void
}

const Scheduler: React.FC<SchedulerProps> = ({ date, events, onAdd }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const formatHour = (hour: number): string => {
    if (hour === 0) return "12:00 AM"
    if (hour === 12) return "12:00 PM"
    if (hour < 12) return `${hour}:00 AM`
    return `${hour - 12}:00 PM`
  }

  return (
    <div className="scheduler">
      <button onClick={() => onAdd(new Date(date.setHours(9, 0)))} className="primaryBtn">
        <span className="body-1">+ New Schedule</span>
      </button>
      <div className="schedulerHeader">
        <h3>Schedules</h3>
        <span className="scheduleSubtitle">{date.toDateString()}</span>
      </div>
      <div className="schedulerBody">
        {hours.map((hour) => {
          const slotTime = new Date(date)
          slotTime.setHours(hour, 0, 0, 0)

          const slotEvents = events.filter(
            (e) => new Date(e.start).getHours() === hour && new Date(e.start).toDateString() === date.toDateString()
          )

          return (
            <div key={hour} className="schedulerSlot">
              <div className="slotTime">{formatHour(hour)}</div>
              <div className="slotEvents">
                {slotEvents.map((event) => (
                  <div key={event.id} className="slotEvent">
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Scheduler;
