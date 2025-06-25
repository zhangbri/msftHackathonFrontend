"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, CheckCircle, Play, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoURL, setVideoURL] = useState<string | null>(null)

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoURL(url)
      console.log("Uploaded video:", file)
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="px-4 lg:px-6 -mb-28 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Camera className="h-8 w-8 text-orange-600" />
          <span className="ml-2 text-xl font-bold">FormSight</span>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex  w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="justify-center items-center container px-4 md:px-6 m-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit bg-orange-100 text-orange-800 hover:bg-orange-200">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Form Analysis
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Perfect Your Workout Form with <span className="text-orange-600">AI Vision</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Upload your workout videos and get instant AI-powered analysis of your form. Prevent injuries,
                    maximize gains, and train like a pro with personalized feedback.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Your First Video
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Free trial
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No equipment needed
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Instant feedback
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Image
                    alt="Workout Analysis Dashboard"
                    className="aspect-[4/3] overflow-hidden rounded-xl object-cover shadow-2xl"
                    height="400"
                    src="/placeholder.svg?height=400&width=600"
                    width="600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Analyzing form...</span>
                        <span className="text-gray-600">92% accuracy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 FormSight. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Support
          </Link>
        </nav>
      </footer>

    </div>
  )
}