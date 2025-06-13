"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Import icons
import {
  Plus,
  Eye,
  Activity,
  Grid3X3,
  List
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"


import { 
  tokens, 
  getActiveTokensCount, 
  getTotalTokenValue, 
  getTokensByStatus 
} from "@/lib/data/tokens"

import { 
  transactions, 
  getRecentTransactions, 
  formatTransactionTime,
  type Transaction
} from "@/lib/data/transactions"

import { 
  getSpeciesRevenue, 
  formatCurrency,
  type SpeciesRevenue
} from "@/lib/data/species"

export default function ProducerDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // Calculate dashboard stats using shared data
  // Removed pond calculations
  const activeTokens = getActiveTokensCount()
  const totalValue = getTotalTokenValue()

  // Get recent tokens (last 3)
  const recentTokens = tokens.slice(-3).reverse()

  // Get recent transactions (last 5)
  const recentTransactions = getRecentTransactions(5)

  // Get species revenue data
  const speciesRevenueData = getSpeciesRevenue()
  // Get tokens by status
  const readySoonTokens = getTokensByStatus("Ready Soon")
  const growingTokens = getTokensByStatus("Growing")

  // Removed pond utilization calculations
  const renderTokenGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokens.map((token) => (
        <Card key={token.id} className="transition-shadow bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {token.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-orange-100 flex-shrink-0">
                    <Image
                      src={token.image}
                      alt={token.species}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg">{token.species}</CardTitle>
                  <CardDescription>Token {token.id}</CardDescription>
                </div>
              </div>
              <Badge variant={token.status === "Ready Soon" ? "destructive" : "secondary"}>
                {token.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-medium">{token.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Harvest Date</p>
                <p className="font-medium">{token.harvestDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Days Remaining</p>
                <p className="font-medium">{token.daysRemaining} days</p>
              </div>
              <div>
                <p className="text-gray-600">Funding</p>
                <p className="font-medium">
                  {token.funded} / {token.total}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Growth Progress</span>
                <span>{token.progress}%</span>
              </div>              
              <Progress value={token.progress} className="h-2" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-gray-100" asChild>
                <Link href="/viewToken">View Details</Link>
              </Button>
              {token.status === "Ready Soon" && (
                <Button size="sm" className="flex-1">
                  Initiate Harvest
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  const renderTokenListView = () => (
    <div className="space-y-4">
      {tokens.map((token) => (
        <Card key={token.id} className="bg-orange-50 transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {token.image && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-orange-100 flex-shrink-0">
                    <Image
                      src={token.image}
                      alt={token.species}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}                
                <div>
                  <h3 className="font-semibold text-lg">{token.species}</h3>
                  <p className="text-sm text-gray-600">
                    Token {token.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{token.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Funding</p>
                  <p className="font-medium">{token.funded}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Harvest Date</p>
                  <p className="font-medium">{token.harvestDate}</p>
                </div>                
                <Badge variant={token.status === "Ready Soon" ? "destructive" : "secondary"}>
                  {token.status}
                </Badge>
                <div className="flex space-x-2"><Button variant="outline" size="sm" asChild>
                    <Link href="/viewToken">View</Link>
                  </Button>
                  {token.status === "Ready Soon" && <Button size="sm">Harvest</Button>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  return (
    <div className="min-h-screen bg-orange-50">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Good morning! Mario</h1>
            <p className="text-gray-600">Manage your harvests and earnings — all in one place.</p>
          </div>
          <Button asChild>
            <Link href="/createNewToken">
              <Plus className="h-4 w-4 mr-2" />
              Create New Token
            </Link>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Active Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{activeTokens}</div>
              <p className="text-sm text-green-600 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₱500,231</div>
              <p className="text-sm text-green-600 mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Pending Settlements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{readySoonTokens.length}</div>
              <p className="text-sm text-orange-600 mt-1">{readySoonTokens.length} ready for harvest</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Average ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">14.2%</div>
              <p className="text-sm text-red-600 mt-1">-1.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="harvests">My Harvests</TabsTrigger>
          </TabsList>          
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    Recent Tokens
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#harvests">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </CardTitle>
                <CardDescription>Latest tokenized assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTokens.map((token) => (
                  <div key={token.id} className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{token.species}</p>
                        <p className="text-sm text-gray-600">{token.id} • {token.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{token.total}</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={token.progress} className="h-1 w-16" />
                        <span className="text-xs text-gray-600">{token.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentTokens.length === 0 && (                  
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No tokens created yet</p>
                    <Button asChild>
                      <Link href="/createNewToken">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Token
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

          {/* Active Tokens Overview */}
          </TabsContent>
          <TabsContent value="harvests" className="space-y-6">
            <Card>
              <CardHeader>                
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Harvest Tokens</CardTitle>
                    <CardDescription>Your current tokenized lobster harvests</CardDescription>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid3X3 className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? renderTokenGridView() : renderTokenListView()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}