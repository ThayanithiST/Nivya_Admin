"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, MapPin, TrendingUp, Percent } from "lucide-react"

interface Customer {
  id: number
  name: string
  location: string
  phone: string
  email: string
  visitCount: number
  totalRevenue: number
  offerPercentage: number
  registrationDate: string
  lastVisit: string
}

export function CustomerRegistration() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Ramya",
      location: "Downtown",
      phone: "+1-555-0123",
      email: "ramya@email.com",
      visitCount: 5,
      totalRevenue: 2750,
      offerPercentage: 10,
      registrationDate: "2023-12-01",
      lastVisit: "2024-01-15",
    },
    {
      id: 2,
      name: "Jaya",
      location: "Uptown",
      phone: "+1-555-0456",
      email: "jaya@email.com",
      visitCount: 3,
      totalRevenue: 1200,
      offerPercentage: 5,
      registrationDate: "2024-01-05",
      lastVisit: "2024-01-16",
    },
    {
      id: 3,
      name: "Sarah",
      location: "Suburbs",
      phone: "+1-555-0789",
      email: "sarah@email.com",
      visitCount: 8,
      totalRevenue: 4500,
      offerPercentage: 15,
      registrationDate: "2023-11-15",
      lastVisit: "2024-01-14",
    },
    {
      id: 4,
      name: "Dhanu",
      location: "City Center",
      phone: "+1-555-0321",
      email: "dhanu@email.com",
      visitCount: 2,
      totalRevenue: 800,
      offerPercentage: 0,
      registrationDate: "2024-01-10",
      lastVisit: "2024-01-17",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    offerPercentage: "0",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newCustomer: Customer = {
      id: Math.max(...customers.map((c) => c.id)) + 1,
      name: formData.name,
      location: formData.location,
      phone: formData.phone,
      email: formData.email,
      visitCount: 0,
      totalRevenue: 0,
      offerPercentage: Number.parseInt(formData.offerPercentage),
      registrationDate: new Date().toISOString().split("T")[0],
      lastVisit: "Never",
    }

    setCustomers([...customers, newCustomer])
    setIsDialogOpen(false)
    setFormData({
      name: "",
      location: "",
      phone: "",
      email: "",
      offerPercentage: "0",
    })
  }

  const getCustomerTier = (visitCount: number, totalRevenue: number) => {
    if (visitCount >= 10 || totalRevenue >= 5000) return { tier: "VIP", color: "bg-purple-100 text-purple-800" }
    if (visitCount >= 5 || totalRevenue >= 2000) return { tier: "Gold", color: "bg-yellow-100 text-yellow-800" }
    if (visitCount >= 2 || totalRevenue >= 500) return { tier: "Silver", color: "bg-gray-100 text-gray-800" }
    return { tier: "Bronze", color: "bg-orange-100 text-orange-800" }
  }

  const totalCustomers = customers.length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalRevenue, 0)
  const averageRevenue = totalRevenue / totalCustomers || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Registration</h1>
          <p className="text-gray-600 mt-2">Manage walk-in customers and track their activity</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Walk-in Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="offer">Initial Offer (%)</Label>
                <Input
                  id="offer"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.offerPercentage}
                  onChange={(e) => setFormData({ ...formData, offerPercentage: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Customer</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{averageRevenue.toFixed(0)}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Visits</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Offer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tier</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => {
                  const { tier, color } = getCustomerTier(customer.visitCount, customer.totalRevenue)
                  return (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-gray-900">{customer.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{customer.visitCount}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">₹{customer.totalRevenue.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        {customer.offerPercentage > 0 ? (
                          <Badge className="bg-green-100 text-green-800">{customer.offerPercentage}% OFF</Badge>
                        ) : (
                          <span className="text-gray-500">No offer</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={color}>{tier}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{customer.lastVisit}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
