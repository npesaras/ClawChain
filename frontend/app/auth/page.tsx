"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Fish, TrendingUp, ShoppingCart, Shield, ArrowRight, ChefHat } from "lucide-react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "producer"
  const [selectedRole, setSelectedRole] = useState(initialRole)

  const handleInternetIdentityLogin = (role: string) => {
    // Store the user role in localStorage for persistence
    localStorage.setItem("userRole", role)
    localStorage.setItem("isAuthenticated", "true")

    // In a real app, this would integrate with Internet Identity
    console.log(`Logging in as ${role} with Internet Identity`)

    // Redirect to role-specific dashboard
    window.location.href = `/dashboard/${role}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-md shadow-lg relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">AquaChain</span>
          </Link>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 hover:text-white" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Join{" "}
              <span className="text-cyan-200">AquaChain</span>
            </h1>
            <p className="text-xl text-blue-100">Choose your role and connect premium lobster sourcing with transparency</p>
          </div>
          
          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm border-0 p-1 rounded-xl">
              <TabsTrigger value="producer" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-white font-medium rounded-lg">
                Lobster Producer
              </TabsTrigger>
              <TabsTrigger value="restaurant" className="data-[state=active]:bg-white data-[state=active]:text-green-600 text-white font-medium rounded-lg">
                Restaurant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="producer" className="mt-8">
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-2xl mb-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Fish className="h-6 w-6 text-blue-600" />
                        </div>
                        Lobster Producer
                      </CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        Connect directly with restaurants and tokenize your premium lobster harvests for superior quality assurance
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        What you can do:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Create tokens for premium lobster harvests
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Connect directly with restaurant buyers
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Ensure quality tracking and traceability
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Increase revenue through transparent sourcing
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Build reputation with restaurant partners
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Requirements:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Sustainable fishing certifications
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Quality assurance documentation
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          KYC verification
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleInternetIdentityLogin("producer")} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                    size="lg"
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Continue with Internet Identity
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="restaurant" className="mt-8">
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-2xl mb-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <ChefHat className="h-6 w-6 text-green-600" />
                        </div>
                        Restaurant
                      </CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        Source premium lobster directly from verified producers with complete transparency and quality assurance
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        What you can do:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Source premium lobster directly from producers
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Verify quality and freshness with blockchain tracking
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Build direct relationships with trusted suppliers
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Access transparent pricing and sourcing
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          Ensure sustainable and ethical sourcing
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Requirements:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Restaurant business verification
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          KYC verification
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Quality standards agreement
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleInternetIdentityLogin("restaurant")} 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                    size="lg"
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Continue with Internet Identity
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
