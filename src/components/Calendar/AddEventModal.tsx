import "./AddEventModal.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import type { SlotInfo } from "react-big-calendar";

interface AddEventModalProps {
  selectedSlot: SlotInfo
  onClose: () => void
  onSubmit: (title: string, description: string, start: Date, end: Date) => void
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  selectedSlot,
  onClose,
  onSubmit,
}) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date(selectedSlot.start))
  const [endDate, setEndDate] = useState<Date>(new Date(selectedSlot.end))

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleAttachmentClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log('Selected files:', files)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(title, description, startDate, endDate)
  }

  return (
    <div className="modalWrapper">
      <div className="modal shadow">
        <div className="modalHeader">
          <div className="modalTitle">
            <h2 className="primaryText">Add New Event</h2>
            <p className="body-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="closeBtn" onClick={onClose}>
            <img src="./images/icons/xmark.png" alt="closeBtn" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="modalBody">
          <div className="dateInput">
            <div className="inputGroup">
              <div className="dateItems">
                <label htmlFor="">
                  <h6>Start Date</h6>
                </label>
                <div className="datePickerGroup">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => date && setStartDate(date)}
                    dateFormat="MMMM do, yyyy"
                    showPopperArrow={false}
                    className="datepickerInput"
                  />
                  <div className="dateIcon">
                    <i className="fa-solid fa-calendar"></i>
                  </div>
                </div>
              </div>
              <div className="dateItems">
                <label htmlFor="">
                  <h6>End Date</h6>
                </label>
                <div className="datePickerGroup">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => date && setEndDate(date)}
                    dateFormat="MMMM do, yyyy"
                    showPopperArrow={false}
                    className="datepickerInput"
                  />
                  <div className="dateIcon">
                    <i className="fa-solid fa-calendar"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="inputGroup">
              <div className="dateItems">
                <label htmlFor="">
                  <h6>Start Time</h6>
                </label>
                <div className="datePickerGroup">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      if (!date) return
                      const updated = new Date(startDate)
                      updated.setHours(date.getHours())
                      updated.setMinutes(date.getMinutes())
                      setStartDate(updated)
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="datepickerInput"
                  />
                  <div className="dateIcon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                </div>
              </div>
              <div className="dateItems">
                <label htmlFor="">
                  <h6>End Time</h6>
                </label>
                <div className="datePickerGroup">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      if (!date) return
                      const updated = new Date(endDate)
                      updated.setHours(date.getHours())
                      updated.setMinutes(date.getMinutes())
                      setEndDate(updated)
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="datepickerInput"
                  />
                  <div className="dateIcon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="eventContent">
            <label htmlFor="">
              <h6>Event Name</h6>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter event name"
              min={3}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inputItem" />
          </div>
          <div className="eventContent">
            <label htmlFor="">
              <h6>Description</h6>
            </label>
            <textarea
              name="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
              required
              className="inputItem" />
          </div>
          <div className="modalBtn">
            <div className="attachBtn" onClick={handleAttachmentClick}>
              <i className="fa-solid fa-paperclip"></i>
              <h4>Add Attachment</h4>
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <button
              type="submit"
              className="primaryBtn"
            >
              <i className="fa-solid fa-floppy-disk"></i>
              <h4>Submit</h4>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEventModal;
