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
import type { CalendarEvent } from "../../types/EventProps";

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

const AdminCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [eventList, setEventList] = useState<CalendarEvent[]>([])

  const handleAddEvent = (title: string, description: string, start: Date, end: Date) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: title,
      description,
      start,
      end,
      users: [],
    }
    const updated = [...events, newEvent]
    setEvents(updated)
    localStorage.setItem('myEvents', JSON.stringify(updated))
    setSelectedSlot(null)
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
        onSelectEvent={(event) => {
          const date = new Date(event.start)

          const eventOnSameDay = events.filter(e => new Date(e.start).toDateString() === date.toDateString()
          )
          setSelectedDate(date)
          setEventList(eventOnSameDay)
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
          events={events.filter(e =>
            new Date(e.start).toDateString() === selectedDate.toDateString()
          )}
          onClose={() => setSelectedDate(null)}
          onAddNew={() => {
            setSelectedSlot({
              start: selectedDate,
              end: selectedDate,
              slots: [selectedDate],
              action: 'click',
            })
            setSelectedDate(null)
          }}
          onDelete={(id) => {
            const updated = events.filter(e => e.id !== id)
            setEvents(updated)
            localStorage.setItem('myEvents', JSON.stringify(updated))
          }}
          onConfirm={(id) => {
            // підтвердження виконання
          }}
          onEdit={(id) => {
            // редагування
          }}
        />
      )}


    </main>
  );
}
export default AdminCalendar;