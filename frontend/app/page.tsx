import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Shield, Users, Leaf, Star, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">        
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">          
        <div className="flex items-center space-x-2">
            <Image src="/shrimp.svg" alt="Shrimp" width={32} height={32} className="text-orange-600" />
            <span className="text-2xl font-bold text-orange-900">ClawChain</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-gray-600 hover:text-orange-600 transition-colors">
              Benefits
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-6" asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>      

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Blockchain-Powered Seafood Sourcing
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Lobster,
              <span className="text-orange-600 block">Direct Connection</span>
            </h1>          
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect restaurants with vetted lobster producers through blockchain tokenization. 
              Ensure superior quality, transparent sourcing, and increased revenue for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg" asChild>
                <Link href="/auth">
                  Start Sourcing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-gray-300" asChild>
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>    

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ClawChain Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to connect restaurants with premium lobster producers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center p-8">                
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Image src="/shrimp.svg" alt="Shrimp" width={32} height={32} />
                </div>
                <CardTitle className="text-2xl mb-4">Producers Register</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Vetted lobster producers register their premium catches on the blockchain, with quality certifications
                  and complete traceability from ocean to table.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center p-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl mb-4">Quality Assured</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Each lobster is tracked with blockchain transparency, ensuring restaurants receive superior quality
                  with verified sourcing and freshness guarantees.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center p-8">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl mb-4">Restaurants Connect</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Restaurants directly connect with trusted lobster producers, securing premium seafood while
                  increasing producer revenue through transparent sourcing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on cutting-edge technology to ensure trust, transparency, and quality
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Blockchain Security</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Built on Aptos blockchain for secure, fast, and scalable transactions with 
                immutable record keeping and transparent operations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sustainability Tracking</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Real-time IoT monitoring and government-issued certifications ensure 
                sustainable practices and environmental compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ClawChain?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of direct, transparent seafood sourcing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Guaranteed Freshness",
                description: "Direct from producer to restaurant with real-time tracking"
              },
              {
                title: "Premium Quality",
                description: "Only vetted producers with certified sustainable practices"
              },
              {
                title: "Transparent Pricing",
                description: "Fair pricing with no hidden fees or middleman markups"
              },
              {
                title: "Blockchain Verified",
                description: "Immutable records of origin, quality, and handling"
              },
              {
                title: "Sustainable Sourcing",
                description: "Supporting environmentally responsible fishing practices"
              },
              {
                title: "Direct Relationships",
                description: "Build lasting partnerships between restaurants and producers"
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {benefit.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>      
      
      {/* CTA Section */}
      <section className="py-20 bg-orange-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Seafood Sourcing?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">Join the future of restaurant-producer connections with ClawChain's 
            blockchain-powered platform.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold" asChild>
            <Link href="/auth">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
