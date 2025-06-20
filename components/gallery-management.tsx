"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Trash2, Star, ImageIcon, Video } from "lucide-react"

interface MediaItem {
  id: number
  type: "image" | "video"
  url: string
  name: string
  isBackground: boolean
  uploadDate: string
}

export function GalleryManagement() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      type: "image",
      url: "/bridal_1.jpg?height=200&width=300",
      name: "Wedding_Photo_001.jpg",
      isBackground: true,
      uploadDate: "2024-01-10",
    },
    {
      id: 2,
      type: "image",
      url: "/bridal_2.jpg?height=200&width=300",
      name: "Portrait_Session_002.jpg",
      isBackground: false,
      uploadDate: "2024-01-12",
    },
    {
      id: 3,
      type: "video",
      url: "/bridal_3.jpg?height=600&width=700",
      name: "Event_Highlight_001.mp4",
      isBackground: false,
      uploadDate: "2024-01-14",
    },
    {
      id: 4,
      type: "image",
      url: "/bridal_4.jpg?height=200&width=300",
      name: "Corporate_Headshot_003.jpg",
      isBackground: false,
      uploadDate: "2024-01-15",
    },
    {
      id: 5,
      type: "image",
      url: "/bridal_5.jpg?height=200&width=300",
      name: "Family_Portrait_004.jpg",
      isBackground: false,
      uploadDate: "2024-01-16",
    },
    {
      id: 6,
      type: "video",
      url: "/bridal_6.jpg?height=200&width=300",
      name: "Wedding_Ceremony_002.mp4",
      isBackground: false,
      uploadDate: "2024-01-17",
    },
  ])

  const deleteMedia = (id: number) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id))
  }

  const setAsBackground = (id: number) => {
    setMediaItems(
      mediaItems.map((item) => ({
        ...item,
        isBackground: item.id === id,
      })),
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real app, you would upload these files to your server
      console.log("Files to upload:", files)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Upload, manage, and organize your media files</p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="flex items-center gap-2" asChild>
              <span>
                <Upload className="h-4 w-4" />
                Upload Media
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={item.url || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 left-2">
                {item.type === "video" ? (
                  <Badge className="bg-red-100 text-red-800">
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-800">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    Image
                  </Badge>
                )}
              </div>
              {item.isBackground && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Background
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 truncate" title={item.name}>
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Uploaded: {item.uploadDate}</p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAsBackground(item.id)}
                  disabled={item.isBackground}
                  className="flex-1"
                >
                  <Star className="h-3 w-3 mr-1" />
                  {item.isBackground ? "Current BG" : "Set as BG"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteMedia(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mediaItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media files</h3>
            <p className="text-gray-600 mb-4">Upload your first image or video to get started</p>
            <label htmlFor="file-upload">
              <Button asChild>
                <span>Upload Media</span>
              </Button>
            </label>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
