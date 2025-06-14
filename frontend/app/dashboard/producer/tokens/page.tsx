"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import {
  Calendar,
  TrendingUp,
  Plus,
  Grid,
  List,
  DollarSign,
  Clock,
  Target,
  Activity,
  CheckCircle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { tokens as sharedTokens } from "@/lib/data/tokens"

export default function MyTokensPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Map shared tokens data to match the page's expected format
  // Use deterministic data mapping based on token ID to avoid hydration issues
  const tokens = sharedTokens.map((token) => {    // Create consistent mappings based on token ID instead of array index
    const penMapping: { [key: string]: string } = {
      "AC-001": "Pen A",
      "AC-002": "Pen B", 
      "AC-003": "Pen C"
    }
    
    const locationMapping: { [key: string]: string } = {
      "AC-001": "North Sector",
      "AC-002": "East Sector",
      "AC-003": "South Sector"
    }
      const buyersMapping: { [key: string]: number } = {
      "AC-001": 8,
      "AC-002": 12,
      "AC-003": 15
    }
    
    const returnMapping: { [key: string]: string } = {
      "AC-001": "12.5%",
      "AC-002": "15.2%",
      "AC-003": "10.8%"
    }
    
    const riskMapping: { [key: string]: string } = {
      "AC-001": "Low",
      "AC-002": "Low",
      "AC-003": "Medium"
    }
    
    const createdDateMapping: { [key: string]: string } = {
      "AC-001": "2024-01-15",
      "AC-002": "2024-01-08",
      "AC-003": "2024-02-01"
    }
      const lastUpdateMapping: { [key: string]: string } = {
      "AC-001": "2 hours ago",
      "AC-002": "1 hour ago",
      "AC-003": "3 hours ago"
    }
      return {
      id: token.id,
      species: token.species,
      scientificName: token.scientificName,
      pond: penMapping[token.id] || "Pen A",
      location: locationMapping[token.id] || "North Sector",
      quantity: token.quantity,
      harvestDate: token.harvestDate,
      progress: token.progress,
      status: token.status,      
      sold: parseInt(token.sold.replace(/[₱,]/g, '')),
      total: parseInt(token.total.replace(/[₱,]/g, '')),
      daysRemaining: token.daysRemaining,
      buyers: buyersMapping[token.id] || 8,
      // For backward compatibility with existing UI
      investors: buyersMapping[token.id] || 8,
      funded: parseInt(token.sold.replace(/[₱,]/g, '')),
      avgReturn: returnMapping[token.id] || "12.5%",
      riskLevel: riskMapping[token.id] || "Low",
      createdDate: createdDateMapping[token.id] || "2024-01-15",
      lastUpdate: lastUpdateMapping[token.id] || "2 hours ago",
      image: token.image,
    }
  })
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready Soon":
        return "bg-green-100 text-green-800"
      case "Growing":
        return "bg-orange-100 text-orange-800"
      case "Funding":
        return "bg-yellow-100 text-yellow-800"
      case "Harvested":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {      case "Ready Soon":
        return <CheckCircle className="h-4 w-4" />
      case "Growing":
        return <Activity className="h-4 w-4" />
      case "Funding":
        return <DollarSign className="h-4 w-4" />
      case "Harvested":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }
  const filteredTokens = statusFilter === "all" ? tokens : tokens.filter((token) => token.status === statusFilter)
  const totalValue = tokens.reduce((sum, token) => sum + token.total, 0)
  const totalSold = tokens.reduce((sum, token) => sum + token.sold, 0)
  const avgProgress = tokens.reduce((sum, token) => sum + token.progress, 0) / tokens.length

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <DashboardHeader userRole="producer" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tokens</h1>
            <p className="text-gray-600">Manage and monitor all your lobster harvest tokens</p>
          </div>
          <div className="flex space-x-3">
            <Button asChild>
              <Link href="/createNewToken">
                <Plus className="h-4 w-4 mr-2" />
                Create Token
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              <Image src="/shrimp.svg" alt="Shrimp" width={16} height={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokens.length}</div>
              <p className="text-xs text-muted-foreground">Active harvest tokens</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">₱{totalSold.toLocaleString()} sold</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgProgress)}%</div>
              <p className="text-xs text-muted-foreground">Across all tokens</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready Soon</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokens.filter((token) => token.status === "Ready Soon").length}</div>
              <p className="text-xs text-muted-foreground">Tokens ready for harvest</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all-tokens" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-tokens">All Tokens</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="all-tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Token Portfolio</CardTitle>
                    <CardDescription>
                      Showing {filteredTokens.length} of {tokens.length} tokens
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Ready Soon">Ready Soon</SelectItem>
                        <SelectItem value="Harvested">Harvested</SelectItem>
                      </SelectContent>
                    </Select>
                    <ToggleGroup
                      type="single"
                      value={viewMode}
                      onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                    >
                      <ToggleGroupItem value="grid" aria-label="Grid view">
                        <Grid className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="list" aria-label="List view">
                        <List className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </CardHeader>
              <CardContent>                
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredTokens.map((token) => (
                      <Card key={token.id} className="transition-shadow bg-orange-100">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(token.status)}>
                              {getStatusIcon(token.status)}
                              <span className="ml-1">{token.status}</span>
                            </Badge>                          
                            </div>
                          <div className="flex items-center space-x-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              {token.image && (
                                <Image
                                  src={token.image}
                                  alt={token.species}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>                            
                            <div>
                              <h4 className="font-semibold text-lg">{token.species}</h4>
                              <p className="text-sm text-gray-600">Token {token.id}</p>                              
                              <p className="text-xs text-gray-500">
                                {token.scientificName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {token.pond} • {token.location}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Quantity</p>
                              <p className="font-medium">{token.quantity}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Progress</p>
                              <p className="font-medium">{token.progress}%</p>
                            </div>
                            <div>                              
                              <p className="text-gray-600">Buyers</p>
                              <p className="font-medium">{token.buyers}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Avg Return</p>
                              <p className="font-medium text-green-600">{token.avgReturn}</p>                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span>{token.progress}%</span>
                            </div>
                            <Progress value={token.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Risk Level</span>
                            <span className={`font-medium ${getRiskColor(token.riskLevel)}`}>{token.riskLevel}</span>
                          </div>                          
                          <div className="flex space-x-2">                            
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link href="/viewToken">View Details</Link>
                            </Button>
                            {token.status === "Ready Soon" && (
                              <Button size="sm" className="flex-1">
                                Harvest
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (                  
                <div className="space-y-4"> 
                    {filteredTokens.map((token) => (
                      <div key={token.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-orange-100">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">                            
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                              {token.image && (
                                <Image
                                  src={token.image}
                                  alt={token.species}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>                            
                            <div>
                              <h4 className="font-semibold text-xl">{token.species}</h4>
                              <p className="text-gray-600">
                                Token {token.id} • {token.pond} ({token.location})
                              </p>
                              <p className="text-sm text-gray-500">{token.scientificName}</p>
                              <p className="text-sm text-gray-500">Created: {token.createdDate}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(token.status)}>
                              {getStatusIcon(token.status)}
                              <span className="ml-1">{token.status}</span>
                            </Badge>
                            <p className="text-sm text-gray-600">Updated: {token.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-6 gap-6 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Quantity</p>
                            <p className="font-semibold">{token.quantity}</p>
                          </div>                          
                          <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="font-semibold">₱{token.total.toLocaleString()}</p>
                          </div>
                          <div>                            
                            <p className="text-sm text-gray-600">Sold</p>
                            <p className="font-semibold text-green-600">₱{token.sold.toLocaleString()}</p>
                          </div>
                          <div>                            
                            <p className="text-sm text-gray-600">Buyers</p>
                            <p className="font-semibold">{token.buyers}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Avg Return</p>
                            <p className="font-semibold text-green-600">{token.avgReturn}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Risk Level</p>
                            <p className={`font-semibold ${getRiskColor(token.riskLevel)}`}>{token.riskLevel}</p>
                          </div>
                        </div>                          
                        <div className="space-y-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Sales Progress</span>
                              <span>{Math.round((token.sold / token.total) * 100)}%</span>
                            </div>
                            <Progress value={(token.sold / token.total) * 100} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span>{token.progress}%</span>
                            </div>
                            <Progress value={token.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Harvest: {token.harvestDate}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {token.daysRemaining} days remaining
                            </span>
                          </div>                          
                          <div className="flex space-x-2">                            
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/viewToken">View Details</Link>
                            </Button>
                            {token.status === "Ready Soon" && <Button size="sm">Initiate Harvest</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token History</CardTitle>
                <CardDescription>Complete timeline of your token activities</CardDescription>
              </CardHeader>
              <CardContent>                  
                <div className="space-y-4">
                  {tokens.slice(0, 5).map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-100">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          {token.image && (
                            <Image
                              src={token.image}
                              alt={token.species}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{token.species}</p>
                          <p className="text-sm text-gray-600">Token {token.id} created</p>
                        </div>
                      </div>                      
                      <div className="text-right">
                        <p className="text-sm font-medium">{token.createdDate}</p>
                        <p className="text-xs text-gray-600">₱{token.total.toLocaleString()} value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
