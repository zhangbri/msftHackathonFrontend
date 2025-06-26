"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Zap, Volume2, VolumeX, Expand} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [slideImage, setSlideImage] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoURL(url)
      console.log("Uploaded video:", file)
    }
  }

  // Simulate promise resolution for testing
  const handleTestExpand = () => {
    setExpanded(true)
    setTimeout(() => setSlideImage(true), 1000) // Wait for fade-out before sliding image (1s)
  }
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  const handleReset = () => {
    setVideoURL(null)
    setSlideImage(false)
    setExpanded(false)
    setIsPaused(true)
    setMuted(true)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
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
              <div className="relative w-full min-h-[400px] flex">
                {/* Text column: fades out, then is removed after slide */}
                <div className={`flex flex-col justify-center space-y-4 transition-opacity duration-1000 w-[600px] min-w-[600px] max-w-[600px] ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                      Upload
                    </Button>
                    {/* Test Expand Button */}
                    <Button variant="secondary" size="lg" onClick={handleTestExpand}>
                      Test Expand
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    style={{ display: "none" }}
                  />
                </div>
                {/* Image panel: slides left after text fades out */}
                <div
                  className={`relative flex items-center transition-all duration-1000 w-[600px] min-w-[600px] max-w-[600px] 
                    ${slideImage ? '-translate-x-[600px] ml-0' : 'translate-x-0 ml-16'}
                  `}
                  style={{ willChange: 'transform' }}
                >
                  <div className="relative aspect-[4/3] w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl"
                      onMouseEnter={() => {
                        if (videoURL) {
                          setIsHovered(true)
                        }
                      }}
                      onMouseLeave={() => {
                        if (videoURL && !videoRef.current?.paused) {
                          setIsHovered(false)
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (videoRef.current) {
                          if (isPaused) {
                            videoRef.current.play()
                            setIsPaused(false)
                          } else {
                            videoRef.current.pause()
                            setIsPaused(true)
                          }
                        }
                      }}                      
                    >

                    {/* Background image only if no video */}
                    {!videoURL && (
                      <Image
                        alt="Workout Analysis Dashboard"
                        src="/favicon/apple-touch-icon.png"
                        fill
                        className="object-contain bg-black/10 rounded-xl"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />

                      {/* Uploaded video */}
                      {videoURL && (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={videoURL}
                          className="absolute inset-0 w-full h-full object-contain z-10 bg-black"
                          playsInline
                          muted={muted}
                          autoPlay
                          loop
                          onPlay={() => {
                            setIsPaused(false)
                          }}
                          onPause={() => {
                            setIsPaused(true)
                          }}
                          onTimeUpdate={() => {
                            const current = videoRef.current?.currentTime || 0
                            const duration = videoRef.current?.duration || 0
                            const timeDisplay = `${formatTime(current)} / ${formatTime(duration)}`
                            const label = document.getElementById('video-timestamp')
                            if (label) label.textContent = timeDisplay
                          }}
                        />
                        {/* Optional timestamp overlay */}
                        <div
                          id="video-timestamp"
                          className="absolute top-2 right-3 text-xs text-white bg-black/60 px-2 py-1 rounded z-30"
                        >
                          0:00 / 0:00
                        </div>
                      </div>
                    )}
                    {videoURL && isHovered && (
                      <>
                        {/* Bottom Right Controls: Mute & Fullscreen */}
                        <div className="absolute bottom-2 right-2 z-30 flex gap-2 items-center bg-black/50 px-2 py-1 rounded">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (videoRef.current) {
                                const newMuted = !muted
                                videoRef.current.muted = newMuted
                                setMuted(newMuted)
                              }
                            }}
                          >
                            {muted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-white" />
                            )}
                          </Button>

                          {/* Fullscreen */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (videoRef.current?.requestFullscreen) {
                                videoRef.current.requestFullscreen()
                              }
                            }}
                          >
                            <Expand className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </>
                    )}
                        {/* Gradient + status panel only if no video */}
                        {!videoURL && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />
                            <div className="absolute bottom-4 left-4 right-4 z-30">
                              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                  <span className="font-medium">Analyzing form...</span>
                                  <span className="text-gray-600">92% accuracy</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
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