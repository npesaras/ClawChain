import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fish, Waves, TrendingUp, Shield, Users, Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white scroll-smooth">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">AquaChain</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="#platform-features" className="text-gray-600 hover:text-blue-600">
              Platform Features
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button className="font-bol" asChild>
              <Link href="/auth" >Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
            Investing in a
            <span className="text-blue-600 block font-bold ">Bountiful Future</span>
          </h1>          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connecting restaurants with vetted lobster producers via blockchain tokenization for superior quality, 
            increased revenue, and transparent sourcing.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How AquaChain Works</h2>
          <div className="grid md:grid-cols-3 gap-8">            
            <Card>
              <CardHeader>
                <Fish className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Producers Register</CardTitle>
                <CardDescription>
                  Vetted lobster producers register their premium catches on the blockchain, with quality certifications
                  and traceability from ocean to table.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Quality Assured</CardTitle>
                <CardDescription>
                  Each lobster is tracked with blockchain transparency, ensuring restaurants receive superior quality
                  with verified sourcing and freshness guarantees.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Restaurants Connect</CardTitle>
                <CardDescription>
                  Restaurants directly connect with trusted lobster producers, securing premium seafood while
                  increasing producer revenue through transparent sourcing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>      {/* Features */}
      <section id="platform-features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                Built on Aptos blockchain for secure, fast, and scalable transactions
              </p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability Tracking</h3>
              <p className="text-gray-600">Real-time IoT monitoring and Government issued certifications</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
