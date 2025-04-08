"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarComponent() {
  const [date, setDate] = React.useState(() => new Date());

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className=""
  />
)

}
