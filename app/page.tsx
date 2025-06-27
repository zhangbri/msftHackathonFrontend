/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useRef, useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Upload, Volume2, VolumeX, Expand } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import apiService from "@/functions/api"

export default function LandingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [slideImage, setSlideImage] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [showTempBox, setShowTempBox] = useState(false) // <-- Adde
  const expandTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tempBoxTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [predictionResults, setPredictionResults] = useState<any>(null)

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Keep the local URL for immediate preview
      const localUrl = URL.createObjectURL(file)
      setVideoURL(localUrl)
      setUploadProgress(0)

      try {
        const res = await apiService.uploadVideo(file)
        console.log("Upload complete. Server response333333333:", res.data)
        setUploadProgress(60);
        // Get the server video URL using the filename from response
        const filename = res.data.filename || res.data.processed_filename || "processed_squat_clip.mp4"
        const serverVideoUrl = apiService.getVideoUrl(filename)

        // Update to use server video URL
        setVideoURL(serverVideoUrl)

        // Store prediction results
        setPredictionResults(res.data.prediction)
        handleTestExpand()
      } catch (err) {
        console.error("Upload failed:", err)
      } finally {
        setUploadProgress(null)
      }

      event.target.value = ""
    }
  }

  // Simulate promise resolution for testing
  const handleTestExpand = () => {
    setExpanded(true)
    expandTimeoutRef.current = setTimeout(() => {
      setSlideImage(true)
      tempBoxTimeoutRef.current = setTimeout(() => {
        setShowTempBox(true)
      }, 1000)
    }, 1000)
  }

  const handleReset = () => {
    // Cancel any pending animations
    if (expandTimeoutRef.current) clearTimeout(expandTimeoutRef.current)
    if (tempBoxTimeoutRef.current) clearTimeout(tempBoxTimeoutRef.current)

    setVideoURL(null)
    setSlideImage(false)
    setExpanded(false)
    setIsPaused(true)
    setMuted(true)
    setShowTempBox(false)
    setPredictionResults(null)

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="px-4 lg:px-6 -mb-28 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/favicon/favicon.ico" alt="FormSight logo" width={32} height={32} className="rounded-sm" />
          <span className="ml-2 text-xl font-bold">FormSight</span>
        </Link>
      </header>

      {uploadProgress !== null && (
        <div className="absolute top-0 left-0 w-full z-50">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-orange-500 rounded transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex  w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="justify-center items-center container px-4 md:px-6 m-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="relative w-full min-h-[400px] flex">
                {/* Text column: fades out, then is removed after slide */}
                <div
                  className={`flex flex-col justify-center space-y-4 transition-opacity duration-1000 w-[600px] min-w-[600px] max-w-[600px] ${expanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Perfect Your Workout Form with <span className="text-orange-600">AI Vision</span>
                    </h1>
                    <p className="max-w-[600px] text-gray-600 md:text-xl">
                      Upload your workout videos and get instant AI-powered analysis of your form. Prevent injuries,
                      maximize gains, and train like a pro with personalized feedback.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    {/* Test Expand Button */}
                    {/* <Button variant="secondary" size="lg" onClick={handleTestExpand}>
                      Test Expand
                    </Button> */}
                    <Button variant="outline" size="lg" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="video/mp4"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    style={{ display: "none" }}
                  />
                </div>
                {/* Image panel: slides left after text fades out */}
                <div
                  className={`relative flex items-center transition-all duration-1000 w-[600px] min-w-[600px] max-w-[600px] 
                    ${slideImage ? "-translate-x-[600px] ml-0" : "translate-x-0 ml-16"}
                  `}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className="relative aspect-[4/3] w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl"
                    onMouseEnter={() => {
                      if (videoURL) setIsHovered(true)
                    }}
                    onMouseLeave={() => {
                      if (videoURL && !videoRef.current?.paused) setIsHovered(false)
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
                        className="object-cover bg-black/10 rounded-xl"
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
                            const label = document.getElementById("video-timestamp")
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
                  </div>
                </div>
                {/* Go Back button below the image, only when slid over */}
                {slideImage && (
                  <div className="absolute left-[calc(50%_-_300px)] bottom-[-70px] w-[600px] flex justify-center">
                    <button
                      className={`w-full py-3 bg-orange-600 text-white rounded-lg font-semibold shadow hover:bg-orange-700 transition-opacity duration-[2000ms] ${slideImage ? "opacity-100" : "opacity-0"}`}
                      onClick={handleReset}
                      style={{ transitionDelay: "900ms" }} // Optional: slight delay for a smoother effect
                    >
                      Go Back
                    </button>
                  </div>
                )}
                {/* Temp box: slides in from the top to the right of the image panel */}
                <div
                  className={`
                    relative flex items-center transition-all duration-700 w-[600px] min-w-[600px] max-w-[600px]
                    ${showTempBox ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"}
                  `}
                  style={{
                    pointerEvents: showTempBox ? "auto" : "none",
                    marginLeft: "-560px", // Negative margin pulls the box left, closer to the image box
                    zIndex: 10,
                  }}
                >
                  <div className="w-full h-[400px] bg-white rounded-xl shadow-2xl p-6 overflow-y-auto">
                    {predictionResults ? (
                      <div className="space-y-6">
                        <div className="text-center border-b pb-4">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Form Analysis Results</h2>
                          <div className="flex items-center justify-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${predictionResults.predicted_label === "good" ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            <span className="text-lg font-semibold capitalize">
                              {predictionResults.predicted_label}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Primary Detection</h3>
                            <div className="flex justify-between items-center">
                              <span className="capitalize text-lg">{predictionResults.predicted_label}</span>
                              <span className="text-2xl font-bold text-orange-600">
                                {(predictionResults.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-orange-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${predictionResults.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-700">All Detections</h3>
                            {predictionResults.class_names.map((className: string, index: number) => {
                              const probability = predictionResults.all_probabilities[index]
                              const percentage = (probability * 100).toFixed(1)
                              return (
                                <div key={className} className="flex justify-between items-center py-1">
                                  <span className="capitalize text-sm">{className}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-1">
                                      <div
                                        className="bg-gray-600 h-1 rounded-full"
                                        style={{ width: `${probability * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-600 w-10 text-right">{percentage}%</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {predictionResults.predicted_label !== "good" && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <h3 className="font-semibold text-red-800 mb-2">Recommendations</h3>
                              <div className="text-sm text-red-700">
                                {predictionResults.predicted_label === "buttwink" && (
                                  <ul className="space-y-1">
                                    <li>• Focus on hip mobility and flexibility</li>
                                    <li>• Strengthen your core and glutes</li>
                                    <li>• Consider reducing squat depth temporarily</li>
                                    <li>• Work on ankle mobility</li>
                                  </ul>
                                )}
                                {predictionResults.predicted_label === "leanforward" && (
                                  <ul className="space-y-1">
                                    <li>• Strengthen your upper back and core</li>
                                    <li>• Focus on keeping chest up</li>
                                    <li>• Check your bar position</li>
                                  </ul>
                                )}
                                {predictionResults.predicted_label === "halfsquat" && (
                                  <ul className="space-y-1">
                                    <li>• Work on hip and ankle mobility</li>
                                    <li>• Practice bodyweight squats to full depth</li>
                                    <li>• Reduce weight if necessary</li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">Analyzing your form...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
