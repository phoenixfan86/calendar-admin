import "./YearView.css";
import React, { Component } from "react";
import moment from "moment";
import type { Moment } from "moment";
import { navigate } from "react-big-calendar/lib/utils/constants";
import { startOfYear, addYears, format, addMonths } from "date-fns";

interface CalendarArray extends Array<Moment[]> {
  currentDate: Moment
  first: Moment
  last: Moment
  year?: number
  month?: number
}

function createCalendar(currentDate?: Moment | Date | string): CalendarArray {
  let momentDate = currentDate ? moment(currentDate) : moment()
  const first = momentDate.clone().startOf("month")
  const last = momentDate.clone().endOf("month")
  const weeksCount = Math.ceil((first.day() + last.date()) / 7)
  const calendar = Object.assign([], { currentDate: momentDate, first, last }) as CalendarArray

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week: Moment[] = []
    calendar.push(week)
    calendar.year = momentDate.year()
    calendar.month = momentDate.month()

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = momentDate.clone().set("date", day + 1 - first.day())
      week.push(date)
    }
  }

  return calendar
}

interface CalendarDateProps {
  dateToRender: Moment
  dateOfMonth: Moment
  onClick: (date: Moment) => void
}

const CalendarDate: React.FC<CalendarDateProps> = ({
  dateToRender,
  dateOfMonth,
  onClick
}) => {
  const isToday = dateToRender.isSame(moment(), "day");
  const isSunday = dateToRender.day() === 0;

  const classes = ["date", "in-month"];
  if (isToday) classes.push("today");
  if (isSunday) classes.push("sunday");

  const today =
    dateToRender.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? "today" : ""

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled className="date prev-month">
        {dateToRender.date()}
      </button>
    )
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled className="date next-month">
        {dateToRender.date()}
      </button>
    )
  }

  return (
    <button className={classes.join(" ")} onClick={() => onClick(dateToRender)}>
      {dateToRender.date()}
    </button>
  );
}

interface CalendarProps {
  date: Moment | Date | string
}

interface CalendarState {
  calendar?: CalendarArray
}

class Calendar extends Component<CalendarProps, CalendarState> {
  state: CalendarState = {
    calendar: undefined,
  }

  componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) })
  }

  componentDidUpdate(prevProps: CalendarProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) })
    }
  }

  render() {
    const { calendar } = this.state
    if (!calendar) return null

    return (
      <div className="month">
        <div className="month-name">
          {calendar.currentDate.format("MMMM").toUpperCase()}
        </div>

        <div className="dayWrapper">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={index} className="day">
              {day}
            </span>
          ))}
        </div>
        <div className="dateWrapper">
          {calendar.flat().map((date) => (
            <CalendarDate
              key={date.format("YYYY-MM-DD")}
              dateToRender={date}
              dateOfMonth={calendar.currentDate}
              onClick={(date) =>
                alert(`Will go to daily-view of ${date.format("YYYY-MM-DD")}`)
              }
            />
          ))}
        </div>


      </div>
    )
  }
}

interface YearProps {
  date: Date
  localizer?: {
    format: (date: Date, formatStr: string) => string
  }
}

class YearView extends Component<YearProps> {
  render() {
    const { date } = this.props
    const range = YearView.range(date)
    const months = []
    const firstMonth = startOfYear(date)

    for (let i = 0; i < 12; i++) {
      months.push(<Calendar key={i + 1} date={addMonths(firstMonth, i)} />)
    }

    return <div className="year">{months}</div>
  }

  static range(date: Date) {
    return [startOfYear(date)]
  }

  static navigate(date: Date, action: string) {
    switch (action) {
      case navigate.PREVIOUS:
        return addYears(date, -1)
      case navigate.NEXT:
        return addYears(date, 1)
      default:
        return date
    }
  }

  static title(date: Date) {
    return format(date, "yyyy")
  }
}

export default YearView;