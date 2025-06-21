import "./Calendar.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { SlotInfo, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US'
import { useState } from 'react';
import YearView from "./YearView";
import AddEventModal from "./AddEventModal"
import EventListModal from "./EventListModal";
import type { Event } from "../../types/EventProps";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [eventList, setEventList] = useState<Event[]>([])

  const handleAddEvent = (title: string, start: Date, end: Date) => {
    const newEvent = {
      title,
      start,
      end,
    }
    const updated = [...events, newEvent]
    setEvents(updated)
    localStorage.setItem('myEvents', JSON.stringify(updated))
    setSelectedSlot(null)
  }

  const handleSelectEvent = (event: Event) => {
    const date = new Date(event.start)
    const sameDayEvents = events.filter(
      (e) =>
        new Date(e.start).toDateString() === date.toDateString()
    )
    setSelectedDate(date)
    setEventList(sameDayEvents)
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

      {/*-- Add new event --*/}
      {selectedSlot && (
        <AddEventModal
          selectedSlot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onSubmit={handleAddEvent}
        />
      )}
      {/*-- End Add new event --*/}

      {selectedDate && (
        <EventListModal
          date={selectedDate}
          events={eventList}
          onClose={() => setSelectedDate(null)}
          onAddNew={() => {
            setSelectedSlot({ start: selectedDate, end: selectedDate }) // Відкриє форму додавання події
          }}
          onDelete={(id) => {
            const updated = events.filter(e => e.id !== id)
            setEvents(updated)
          }}
          onConfirm={(id) => {
            // логіка підтвердження
          }}
          onEdit={(id) => {
            // логіка редагування
          }}
        />
      )}

    </main>
  );
}
export default AdminCalendar;