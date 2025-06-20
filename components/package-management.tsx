"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Package {
  id: number
  name: string
  description: string
  price: number
  isActive: boolean
  createdDate: string
}

export function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: "The Electric Bride",
      description: "Getting ready for your wedding one of the most enjoyable part of your big day",
      price: 25000,
      isActive: true,
      createdDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Airbrush makeup",
      description: "The highly-acclaimed package has been popular among our brides over the time",
      price: 30000,
      isActive: true,
      createdDate: "2024-01-05",
    },
    {
      id: 3,
      name: "Luminous and Radiant",
      description: "The highly-acclaimed package has been popular among our brides over the time",
      price: 40000,
      isActive: true,
      createdDate: "2024-01-10",
    }
  ])

  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isActive: true,
  })

  const togglePackageStatus = (id: number) => {
    setPackages(packages.map((pkg) => (pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg)))
  }

  const deletePackage = (id: number) => {
    setPackages(packages.filter((pkg) => pkg.id !== id))
  }

  const openEditDialog = (pkg?: Package) => {
    if (pkg) {
      setEditingPackage(pkg)
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.toString(),
        isActive: pkg.isActive,
      })
    } else {
      setEditingPackage(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        isActive: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const packageData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      isActive: formData.isActive,
      createdDate: new Date().toISOString().split("T")[0],
    }

    if (editingPackage) {
      setPackages(packages.map((pkg) => (pkg.id === editingPackage.id ? { ...pkg, ...packageData } : pkg)))
    } else {
      const newPackage = {
        id: Math.max(...packages.map((p) => p.id)) + 1,
        ...packageData,
      }
      setPackages([...packages, newPackage])
    }

    setIsDialogOpen(false)
    setEditingPackage(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600 mt-2">Create and manage your service packages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openEditDialog()} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingPackage ? "Update" : "Create"} Package</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Packages ({packages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Package Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{pkg.name}</p>
                      <p className="text-sm text-gray-600">Created: {pkg.createdDate}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900 max-w-xs truncate" title={pkg.description}>
                        {pkg.description}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">₹{pkg.price.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Switch checked={pkg.isActive} onCheckedChange={() => togglePackageStatus(pkg.id)} />
                        <Badge className={pkg.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(pkg)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePackage(pkg.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
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
