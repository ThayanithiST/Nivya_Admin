"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, RefreshCw, Eye } from "lucide-react"

interface Booking {
  id: number
  customerName: string
  phone: string
  service: string
  date: string
  time: string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  notes?: string
}

export function BookingHandle() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customerName: "Dhanu",
      phone: "+1-555-0123",
      service: "Wedding Makeup",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "Confirmed",
      notes: "Outdoor ceremony, prefer natural look",
    },
    {
      id: 2,
      customerName: "Ramya",
      phone: "+1-555-0456",
      service: "Portrait Makeup",
      date: "2024-01-16",
      time: "4:30 PM",
      status: "Pending",
      notes: "Family of 4, prefer glosy finish",
    },
    {
      id: 3,
      customerName: "Jaya",
      phone: "+1-555-0789",
      service: "Event Makeup",
      date: "2024-01-14",
      time: "6:00 PM",
      status: "Completed",
    },
    {
      id: 4,
      customerName: "Sarah",
      phone: "+1-555-0321",
      service: "Corporate Makeup",
      date: "2024-01-17",
      time: "10:00 AM",
      status: "Confirmed",
      notes: "Business attire, natural look preferred",
    },
  ])

  const updateBookingStatus = (id: number, newStatus: Booking["status"]) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all customer bookings</p>
        </div>
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{booking.service}</p>
                      {booking.notes && (
                        <p className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={booking.notes}>
                          {booking.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{booking.date}</p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`tel:${booking.phone}`)}
                          className="flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          Call
                        </Button>
                        <Select
                          value={booking.status}
                          onValueChange={(value: Booking["status"]) => updateBookingStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
