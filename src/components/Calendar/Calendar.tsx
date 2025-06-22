import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { SlotInfo, View, ToolbarProps as RBC_ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US"
import { useState } from "react";
import YearView from "./YearView";
import AddEventModal from "./AddEventModal";
import EventListModal from "./EventListModal";
import type { CalendarEvent } from "../../types/EventProps";
import Scheduler from "./Sheduler";

type CustomView = View | "year";

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

interface CustomToolbarProps extends Omit<RBC_ToolbarProps<any, object>, "view" | "onView"> {
  view: CustomView;
  onView: (view: CustomView) => void;
}

const CustomToolbar = ({
  label,
  onNavigate,
  onView,
  view,
  date,
  views,
  localizer: toolbarLocalizer,
}: CustomToolbarProps) => {
  const availableViews: (keyof typeof viewLabels)[] = ["day", "week", "month", "year"];

  const viewLabels = {
    day: "Daily",
    week: "Weekly",
    month: "Monthly",
    year: "Yearly",
  };

  return (
    <div className="customToolbar">
      <div className="toolbarNavBtn">
        <button onClick={() => onNavigate("PREV")} className="prevNextBtn"><i className="fa-solid fa-caret-left"></i></button>
        <span className="rbc-toolbar-label">{label}</span>
        <button onClick={() => onNavigate("NEXT")} className="prevNextBtn"><i className="fa-solid fa-caret-right"></i></button>
      </div>

      <div className="view-buttons">
        {availableViews.map((viewName) => (
          <button
            key={viewName}
            onClick={() => onView(viewName as CustomView)}
            className={viewName === view ? "active" : ""}
          >
            {viewLabels[viewName]}
          </button>
        ))}
      </div>
    </div>
  );
};

const AdminCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [eventList, setEventList] = useState<CalendarEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<CustomView>("month")

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
    localStorage.setItem("myEvents", JSON.stringify(updated))
    setSelectedSlot(null)
  }


  const handleViewChange = (view: CustomView) => {
    setCurrentView(view);
  };

  const handleRBCViewChange = (view: View) => {
    setCurrentView(view);
  };

  return (
    <main className="adminCalendar">
      <div className="calendarWrapper">
        {currentView !== "year" ? (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={(newDate) => setCurrentDate(newDate)}
            toolbar={true}
            components={{
              toolbar: (props) => (
                <CustomToolbar
                  {...props}
                  view={currentView}
                  onView={handleViewChange}
                />
              )
            }}
            view={currentView as View}
            onView={handleRBCViewChange}
            views={{
              day: true,
              week: true,
              month: true,
            }}
            formats={{
              weekdayFormat: (date) =>
                localizer.format(date, "EEEE", "en-US")
            }}
            selectable
            onSelectSlot={(slotInfo) => {
              setSelectedSlot(slotInfo)
            }}
            onSelectEvent={(event) => {
              const date = new Date(event.start)
              const eventOnSameDay = events.filter(e => new Date(e.start).toDateString() === date.toDateString())
              setSelectedDate(date)
              setEventList(eventOnSameDay)
            }}
          />
        ) : (
          <div>
            <CustomToolbar
              label={localizer.format(currentDate, "yyyy", "en-US")}
              onNavigate={(action) => {
                const newDate = new Date(currentDate);
                if (action === "PREV") {
                  newDate.setFullYear(newDate.getFullYear() - 1);
                } else if (action === "NEXT") {
                  newDate.setFullYear(newDate.getFullYear() + 1);
                } else if (action === "TODAY") {
                  setCurrentDate(new Date());
                  return;
                }
                setCurrentDate(newDate);
              }}
              view={currentView}
              onView={handleViewChange}
              date={currentDate}
              views={{ day: true, week: true, month: true }}
              localizer={localizer}
            />
            <YearView
              date={currentDate}
            />
          </div>
        )}
      </div>

      <div className="schedulerWrapper shadow-2">
        <Scheduler
          date={currentDate}
          events={events}
          onAdd={(startTime) => {
            setSelectedSlot({
              start: startTime,
              end: new Date(startTime.getTime() + 60 * 60 * 1000),
              slots: [startTime],
              action: "click",
            })
          }}
        />
      </div>

      {/*-- Add new event --*/}
      {selectedSlot && (
        <AddEventModal
          selectedSlot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onSubmit={handleAddEvent}
        />
      )}
      {/*-- End Add new event --*/}
      {/*-- Event list --*/}
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
              action: "click",
            })
            setSelectedDate(null)
          }}
          onDelete={(id) => {
            const updated = events.filter(e => e.id !== id)
            setEvents(updated)
            localStorage.setItem("myEvents", JSON.stringify(updated))
          }}
          onConfirm={(id) => {
          }}
          onEdit={(id) => {
          }}
        />
      )}
      {/*-- End Event list --*/}

    </main>
  );
}

export default AdminCalendar;