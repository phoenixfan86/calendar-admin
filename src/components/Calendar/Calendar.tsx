import "./Calendar.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { SlotInfo, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US'
import { useState } from 'react';
import YearView from "./YearView";

const locales = {
  'en-US': enUS,
}


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

type EventType = {
  title: string
  start: Date
  end: Date
}

const AdminCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [events, setEvents] = useState<EventType[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const title = (form.elements.namedItem('title') as HTMLInputElement).value

    if (selectedSlot) {
      const newEvent = {
        title,
        start: selectedSlot.start,
        end: selectedSlot.end,
      }
      const updated = [...events, newEvent]
      setEvents(updated)
      localStorage.setItem('myEvents', JSON.stringify(updated))
      setSelectedSlot(null)
    }
  }

  const [currentView, setCurrentView] = useState<View>('month')

  return (
    <main className="adminCalendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        toolbar={true}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={{
          day: true,
          week: true,
          month: true,
          year: YearView,
        } as any}
        messages={{ year: 'Year' } as any}
        selectable
        onSelectSlot={(slotInfo) => {
          setSelectedSlot(slotInfo)
        }}
      />

      {selectedSlot && (
        <div className="modalWrapper">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Назва події" required />
              <button type="submit">Зберегти</button>
              <button type="button" onClick={() => setSelectedSlot(null)}>Скасувати</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
export default AdminCalendar;