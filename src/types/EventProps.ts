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

export interface ToolbarProps {
  label: string;
  onNavigate: (action: 'PREV' | 'NEXT' | 'DATE') => void;
  onView: (view: string) => void;
  views: string[];
  view: string;
}