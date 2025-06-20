export interface CalendarEvent {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  users?: string[]
}

export interface EventListModalProps {
  date: Date
  events: CalendarEvent[]
  onClose: () => void
  onAddNew: () => void
  onDelete: (id: string) => void
  onConfirm: (id: string) => void
  onEdit: (id: string) => void
}