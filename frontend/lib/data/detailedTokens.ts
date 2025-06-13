// Detailed token data for ClawChain platform
// This file contains comprehensive token information including producer details, 
// harvest data, sustainability metrics, IoT monitoring, and transaction history

export interface Producer {
  name: string
  location: string
  avatar: string
  rating: number
  totalHarvests: number
  sustainabilityScore: number
  certifications: string[]
  joinDate: string
  bio: string
}

export interface HarvestDetails {
  quantity: string
  totalValue: string
  pricePerKg: string
  harvestDate: string
  location: string
  coordinates: string
  waterDepth: string
  cageSize: string
  stockingDate: string
  expectedYield: string
  currentWeight: string
  growthProgress?: number
  status?: string
}

export interface BuyerInfo {
  totalValue: number
  sold: number
  salesProgress: number
  buyers: number
  pricePerKg: string
  daysLeft: number
  soldQuantity: number
}

export interface SustainabilityMetrics {
  overallScore: number
  waterQuality: number
  feedEfficiency: number
  carbonFootprint: number
  animalWelfare: number
  certifications: Array<{
    name: string
    status: string
    expires: string
  }>
}

export interface IoTData {
  temperature: number
  oxygen: number
  ph: number
  salinity: number
  turbidity: number
  lastUpdated: string
  alerts: string[]
}

export interface TimelineEvent {
  date: string
  event: string
  type: string
  details: string
}

export interface Transaction {
  date: string
  buyer: string
  amount: string
  tokens: number
  type: string
}

export interface Document {
  name: string
  type: string
  size: string
}

export interface DetailedToken {
  id: string
  species: string
  scientificName: string
  producer: Producer
  harvest: HarvestDetails
  buyer: BuyerInfo
  sustainability: SustainabilityMetrics
  iotData: IoTData
  timeline: TimelineEvent[]
  transactions: Transaction[]
  documents: Document[]
}

export const detailedTokens: DetailedToken[] = [
  {
    id: "AC-001",
    species: "Banagan",
    scientificName: "Panulirus longipes",    
    producer: {
      name: "Palawan Marine Farm",
      location: "Puerto Princesa, Palawan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      totalHarvests: 47,
      sustainabilityScore: 95,
      certifications: ["BFAR Certified", "Organic", "Sustainable Aquaculture"],
      joinDate: "2019",
      bio: "Family-owned sustainable lobster farm operating in the pristine waters of Palawan for over 30 years.",
    },    
    harvest: {
      quantity: "2,500 kg",
      totalValue: "₱25,000",
      pricePerKg: "₱10.00",
      harvestDate: "2024-03-15",
      location: "Farm A - Sector 3, Puerto Princesa Bay",
      coordinates: "9.7392° N, 118.7353° E",
      waterDepth: "25 meters",
      cageSize: "50m x 50m",
      stockingDate: "2023-05-01",
      expectedYield: "2,500 kg",
      currentWeight: "4.2 kg avg",
      growthProgress: 75,
      status: "Growing",    },
    buyer: {
      totalValue: 25000,
      sold: 18750,
      salesProgress: 75,
      buyers: 8,
      pricePerKg: "₱10.00",
      daysLeft: 12,
      soldQuantity: 1875,
    },
    sustainability: {
      overallScore: 95,
      waterQuality: 92,
      feedEfficiency: 98,
      carbonFootprint: 94,
      animalWelfare: 96,
      certifications: [
        { name: "ASC", status: "Active", expires: "2025-06-01" },
        { name: "BAP 4-Star", status: "Active", expires: "2024-12-15" },
        { name: "Carbon Neutral", status: "Active", expires: "2024-11-30" },
      ],
    },
    iotData: {
      temperature: 18.5,
      oxygen: 8.2,
      ph: 7.1,
      salinity: 34.2,
      turbidity: 2.1,
      lastUpdated: "2024-01-20T10:30:00Z",
      alerts: [],
    },
    timeline: [
      {
        date: "2024-01-20",
        event: "IoT sensors report optimal conditions",
        type: "monitoring",
        details: "All parameters within ideal ranges",
      },
      {
        date: "2024-01-18",
        event: "Monthly health inspection completed",
        type: "inspection",
        details: "100% fish health score, no mortality detected",
      },
      {
        date: "2024-01-15",
        event: "Feeding optimization implemented",
        type: "management",
        details: "New AI-driven feeding schedule reduces waste by 12%",
      },
      {
        date: "2024-01-10",
        event: "Funding milestone reached",
        type: "funding",
        details: "75% funding target achieved",
      },
    ],
    transactions: [
      {
        date: "2024-01-20",
        buyer: "EcoInvestor.icp",
        amount: "₱2,500",
        tokens: 250,
        type: "purchase",
      },
      {
        date: "2024-01-18",
        buyer: "GreenFund.icp",
        amount: "₱5,000",
        tokens: 500,
        type: "purchase",
      },
      {
        date: "2024-01-15",
        buyer: "SustainableCapital.icp",
        amount: "₱1,000",
        tokens: 100,
        type: "purchase",
      },
    ],
    documents: [
      { name: "Sustainability Report Q4 2023", type: "PDF", size: "2.4 MB" },
      { name: "Health Inspection Certificate", type: "PDF", size: "1.1 MB" },
      { name: "ASC Certification", type: "PDF", size: "856 KB" },
    ],  
  },
  {
    id: "AC-002",
    species: "Udang",
    scientificName: "Panulirus penicillatus",    
    producer: {
      name: "Bohol Coastal Farm",
      location: "Bohol, Philippines",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      totalHarvests: 32,
      sustainabilityScore: 88,
      certifications: ["Organic Certified", "BFAR Certified"],
      joinDate: "2020",
      bio: "Sustainable lobster farming with focus on clean coastal waters and organic practices.",
    },    
    harvest: {
      quantity: "1,800 kg",
      totalValue: "₱15,000",
      pricePerKg: "₱8.33",
      harvestDate: "2024-02-28",
      location: "Coastal Farm - Pen B, Panglao Island",
      coordinates: "9.5804° N, 123.7443° E",
      waterDepth: "15 meters",
      cageSize: "30m x 20m",
      stockingDate: "2023-04-15",
      expectedYield: "1,800 kg",
      currentWeight: "1.2 kg avg",
      growthProgress: 90,
      status: "Ready Soon",    },
    buyer: {
      totalValue: 15000,
      sold: 13500,
      salesProgress: 90,
      buyers: 12,
      pricePerKg: "₱8.33",
      daysLeft: 5,
      soldQuantity: 1620,
    },
    sustainability: {
      overallScore: 88,
      waterQuality: 95,
      feedEfficiency: 85,
      carbonFootprint: 90,
      animalWelfare: 82,
      certifications: [
        { name: "Organic Certified", status: "Active", expires: "2025-03-01" },
        { name: "BAP 4-Star", status: "Active", expires: "2024-10-15" },
      ],
    },
    iotData: {
      temperature: 12.8,
      oxygen: 9.1,
      ph: 7.3,
      salinity: 0.1,
      turbidity: 1.8,
      lastUpdated: "2024-01-20T09:15:00Z",
      alerts: [],
    },
    timeline: [
      {
        date: "2024-01-19",
        event: "Pre-harvest quality assessment",
        type: "inspection",
        details: "Fish quality excellent, ready for harvest soon",
      },
      {
        date: "2024-01-12",
        event: "Final feeding cycle completed",
        type: "management",
        details: "Stopped feeding in preparation for harvest",
      },
      {
        date: "2024-01-05",
        event: "90% funding milestone reached",
        type: "funding",
        details: "Successfully reached funding target",
      },
    ],
    transactions: [
      {
        date: "2024-01-19",
        buyer: "TroutLover.icp",
        amount: "₱1,500",
        tokens: 180,
        type: "purchase",
      },
      {
        date: "2024-01-10",
        buyer: "MountainInvest.icp",
        amount: "₱3,000",
        tokens: 360,
        type: "purchase",
      },
    ],
    documents: [
      { name: "Organic Certification", type: "PDF", size: "1.8 MB" },
      { name: "Water Quality Report", type: "PDF", size: "980 KB" },
      { name: "Growth Progress Report", type: "PDF", size: "1.2 MB" },
    ],  
  },
  {
    id: "AC-003",
    species: "Spiny Lobster",
    scientificName: "Panulirus spp.",    
    producer: {
      name: "Siargao Marine Farm",
      location: "Siargao, Surigao del Norte",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      totalHarvests: 28,
      sustainabilityScore: 92,
      certifications: ["BFAR Certified", "Organic", "Global GAP"],
      joinDate: "2021",
      bio: "Marine lobster farming with traditional methods and modern sustainability practices in Siargao's pristine waters.",
    },    
    harvest: {
      quantity: "3,200 kg",
      totalValue: "₱32,000",
      pricePerKg: "₱10.00",
      harvestDate: "2024-04-20",
      location: "Siargao Marine Farm - Cage C1, Cloud 9",
      coordinates: "9.8601° N, 126.1666° E",
      waterDepth: "20 meters",
      cageSize: "40m x 40m",
      stockingDate: "2023-06-01",
      expectedYield: "3,200 kg",
      currentWeight: "2.8 kg avg",
      growthProgress: 45,
      status: "Growing",    },
    buyer: {
      totalValue: 32000,
      sold: 28800,
      salesProgress: 90,
      buyers: 15,
      pricePerKg: "₱10.00",
      daysLeft: 28,
      soldQuantity: 2880,
    },
    sustainability: {
      overallScore: 92,
      waterQuality: 89,
      feedEfficiency: 94,
      carbonFootprint: 91,
      animalWelfare: 95,
      certifications: [
        { name: "ASC", status: "Active", expires: "2025-08-01" },
        { name: "EU Organic", status: "Active", expires: "2024-11-30" },
        { name: "Global GAP", status: "Active", expires: "2025-01-15" },
      ],
    },
    iotData: {
      temperature: 20.2,
      oxygen: 7.8,
      ph: 8.1,
      salinity: 35.8,
      turbidity: 2.3,
      lastUpdated: "2024-01-20T11:45:00Z",
      alerts: [],
    },    timeline: [
      {
        date: "2024-01-18",
        event: "Mid-cycle health assessment",
        type: "inspection",
        details: "Lobsters showing excellent growth rates",
      },
      {
        date: "2024-01-10",
        event: "Feeding protocol optimization",
        type: "management",
        details: "Adjusted feeding schedule for optimal growth",
      },
      {
        date: "2024-01-05",
        event: "Strong investor interest",
        type: "funding",
        details: "90% funding achieved ahead of schedule",
      },
    ],    transactions: [
      {
        date: "2024-01-18",
        buyer: "PalawanCapital.ph",
        amount: "₱5,000",
        tokens: 500,
        type: "purchase",
      },
      {
        date: "2024-01-12",
        buyer: "VisayasFund.ph",
        amount: "₱8,000",
        tokens: 800,
        type: "purchase",
      },
    ],
    documents: [
      { name: "BFAR Sustainability Report", type: "PDF", size: "2.1 MB" },
      { name: "Philippine Organic Certificate", type: "PDF", size: "1.5 MB" },
      { name: "Growth Tracking Report", type: "PDF", size: "1.8 MB" },
    ],
  },
]

// Helper functions
export const getDetailedTokenById = (id: string): DetailedToken | undefined => {
  return detailedTokens.find(token => token.id === id)
}

export const getTokensByProducer = (producerName: string): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.producer.name.toLowerCase().includes(producerName.toLowerCase())
  )
}

export const getTokensBySpecies = (species: string): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.species.toLowerCase().includes(species.toLowerCase())
  )
}

export const getActiveDetailedTokens = (): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.harvest.status !== "Harvested"
  )
}

export const getTokensBySalesProgress = (minProgress: number): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.buyer.salesProgress >= minProgress
  )
}

export const getHighPerformingTokens = (): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.sustainability.overallScore >= 90
  )
}

export const getTotalDetailedTokenValue = (): number => {
  return detailedTokens.reduce((sum, token) => sum + token.buyer.totalValue, 0)
}

export const getTotalSoldAmount = (): number => {
  return detailedTokens.reduce((sum, token) => sum + token.buyer.sold, 0)
}

export const getAverageSustainabilityScore = (): number => {
  const totalScore = detailedTokens.reduce((sum, token) => sum + token.sustainability.overallScore, 0)
  return Math.round(totalScore / detailedTokens.length)
}

export const getTokensNearHarvest = (daysThreshold: number = 30): DetailedToken[] => {
  return detailedTokens.filter(token => token.buyer.daysLeft <= daysThreshold)
}
