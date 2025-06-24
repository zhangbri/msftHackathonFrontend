import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Brain, TrendingUp, Shield, Upload, BarChart3, CheckCircle, Play, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Camera className="h-8 w-8 text-orange-600" />
          <span className="ml-2 text-xl font-bold">FormSight</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container px-4 md:px-6">
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
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
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

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Advanced AI Analysis for Every Exercise
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our computer vision technology analyzes your movements in real-time, providing detailed feedback on
                  form, technique, and areas for improvement.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Brain className="h-10 w-10 text-orange-600" />
                  <CardTitle>AI Form Analysis</CardTitle>
                  <CardDescription>
                    Advanced computer vision algorithms analyze your posture, alignment, and movement patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Real-time pose detection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Joint angle analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Movement quality scoring
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-orange-600" />
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Monitor your improvement over time with detailed analytics and progress reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Form improvement metrics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Weekly progress reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Goal setting & tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <Shield className="h-10 w-10 text-orange-600" />
                  <CardTitle>Injury Prevention</CardTitle>
                  <CardDescription>
                    Get alerts about potentially harmful movements and receive corrective guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Risk assessment alerts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Corrective exercise suggestions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Safety recommendations
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">How It Works</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Perfect Form in 3 Simple Steps</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our streamlined process makes it easy to analyze your workouts and improve your form
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Upload Your Video</h3>
                  <p className="text-gray-600">
                    Record your workout with any device and upload it to our secure platform. We support all major video
                    formats.
                  </p>
                </div>
                <Upload className="h-12 w-12 text-orange-600" />
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our advanced computer vision algorithms analyze your movements, posture, and form in real-time with
                    95%+ accuracy.
                  </p>
                </div>
                <Brain className="h-12 w-12 text-orange-600" />
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Get Feedback</h3>
                  <p className="text-gray-600">
                    Receive detailed analysis, personalized recommendations, and actionable insights to improve your
                    form and prevent injuries.
                  </p>
                </div>
                <BarChart3 className="h-12 w-12 text-orange-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trusted by Fitness Enthusiasts Worldwide
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their workout form and prevented injuries
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-orange-600">10K+</div>
                <div className="text-sm text-gray-600">Videos Analyzed</div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-orange-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-orange-600">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Perfect Your Form?</h2>
                <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your free trial today and experience the power of AI-driven workout analysis
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Upload className="mr-2 h-4 w-4" />
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-orange-200">No credit card required • 7-day free trial • Cancel anytime</p>
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
