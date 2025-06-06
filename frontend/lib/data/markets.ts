// Market data for TidalFi platform

export interface Restaurant {
  id: string
  name: string
  type: string
  location: string
  rating: number
  preferredFish: string[]
  orderFrequency: string
  avgOrderSize: string
  priceRange: string
  specialRequirements: string
  lastOrder: string
  totalOrders: number
  preferredDelivery: string
  chefRating: string
  paymentTerms: string
  status: "Active" | "High Volume" | "Premium Partner" | "Growing"
  image?: string
}

export interface MarketDemand {
  species: string
  demandLevel: "Hot" | "High" | "Medium" | "Low"
  avgFundingTime: string
  currentPrice: string
  priceChange: string
}

export interface QualityPremium {
  grade: string
  premiumPercentage: string
}

// Chart data interfaces
export interface DemandChartData {
  month: string
  Tilapia: number
  Milkfish: number
  Pompano: number
}

export interface PriceChartData {
  month: string
  Tilapia: number
  Milkfish: number
  Pompano: number
}

export interface DemandVolumeData {
  species: string
  volume: number
  percentage: number
}

export const restaurants: Restaurant[] = [
  {
    id: "rai-food",
    name: "Rai-Food",
    type: "Fine Dining",
    location: "Iligan City, Philippines",
    rating: 4.8,
    preferredFish: ["Tilapia", "Milkfish", "Pompano"],
    orderFrequency: "Weekly",
    avgOrderSize: "150-200 kg",
    priceRange: "₱12-18/kg",
    specialRequirements: "Super Premium grade only",
    lastOrder: "3 days ago",
    totalOrders: 24,
    preferredDelivery: "Tuesday & Friday",
    chefRating: "Michelin 2-Star",
    paymentTerms: "Net 15",
    status: "Active",
    image: "/rai-rock.JPG",
  },
  {
    id: "fish-head",
    name: "Fish-Head",
    type: "Casual Fine Dining",
    location: "Iligan City, Philippines",
    rating: 4.6,
    preferredFish: ["Milkfish", "Tilapia", "Pompano"],
    orderFrequency: "Bi-weekly",
    avgOrderSize: "80-120 kg",
    priceRange: "₱10-15/kg",
    specialRequirements: "Organic certified preferred",
    lastOrder: "1 week ago",
    totalOrders: 18,
    preferredDelivery: "Monday & Thursday",
    chefRating: "James Beard Nominated",
    paymentTerms: "Net 30",
    status: "Active",
    image: "/fish-head.jpg",
  },
  {
    id: "sea-food-tail",
    name: "Sea Food Tail",
    type: "Seafood Specialist",
    location: "Iligan City, Philippines",
    rating: 4.7,
    preferredFish: ["Pompano", "Milkfish", "Tilapia"],
    orderFrequency: "Weekly",
    avgOrderSize: "100-150 kg",
    priceRange: "₱11-16/kg",
    specialRequirements: "Fresh daily delivery required",
    lastOrder: "5 days ago",
    totalOrders: 31,
    preferredDelivery: "Wednesday & Saturday",
    chefRating: "AAA Five Diamond",
    paymentTerms: "Net 15",
    status: "High Volume",
    image: "/seafood-tail.jpg",
  },
]

export const marketDemand: MarketDemand[] = [
  {
    species: "Tilapia",
    demandLevel: "Hot",
    avgFundingTime: "1.8 days",
    currentPrice: "₱8.50/kg",
    priceChange: "+15.2%",
  },
  {
    species: "Milkfish",
    demandLevel: "High",
    avgFundingTime: "2.3 days",
    currentPrice: "₱12.80/kg",
    priceChange: "+10.5%",
  },
  {
    species: "Pompano",
    demandLevel: "High",
    avgFundingTime: "2.1 days",
    currentPrice: "₱16.20/kg",
    priceChange: "+18.7%",
  },
]

export const qualityPremiums: QualityPremium[] = [
  {
    grade: "Premium Grade",
    premiumPercentage: "+15%",
  },
  {
    grade: "Super Premium",
    premiumPercentage: "+25%",
  },
  {
    grade: "Organic Certified",
    premiumPercentage: "+30%",
  },
]

// Chart data for Market Demand Analysis
export const demandChartData: DemandChartData[] = [
  { month: "Jan", Tilapia: 85, Milkfish: 78, Pompano: 92 },
  { month: "Feb", Tilapia: 88, Milkfish: 82, Pompano: 95 },
  { month: "Mar", Tilapia: 92, Milkfish: 85, Pompano: 98 },
  { month: "Apr", Tilapia: 95, Milkfish: 88, Pompano: 94 },
  { month: "May", Tilapia: 98, Milkfish: 92, Pompano: 96 },
  { month: "Jun", Tilapia: 100, Milkfish: 95, Pompano: 100 },
]

// Chart data for Pricing Trends
export const priceChartData: PriceChartData[] = [
  { month: "Jan", Tilapia: 7.20, Milkfish: 10.50, Pompano: 13.80 },
  { month: "Feb", Tilapia: 7.45, Milkfish: 11.20, Pompano: 14.20 },
  { month: "Mar", Tilapia: 7.80, Milkfish: 11.80, Pompano: 14.90 },
  { month: "Apr", Tilapia: 8.10, Milkfish: 12.20, Pompano: 15.50 },
  { month: "May", Tilapia: 8.35, Milkfish: 12.60, Pompano: 15.85 },
  { month: "Jun", Tilapia: 8.50, Milkfish: 12.80, Pompano: 16.20 },
]

// Demand volume data for pie chart
export const demandVolumeData: DemandVolumeData[] = [
  { species: "Tilapia", volume: 2450, percentage: 42 },
  { species: "Milkfish", volume: 1890, percentage: 32 },
  { species: "Pompano", volume: 1520, percentage: 26 },
]

// Helper functions
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id)
}

export const getRestaurantsByType = (type: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.type.toLowerCase().includes(type.toLowerCase()))
}

export const getRestaurantsBySpecies = (species: string): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.preferredFish.some(fish => 
      fish.toLowerCase().includes(species.toLowerCase())
    )
  )
}

export const getHighVolumeRestaurants = (): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.status === "High Volume" || restaurant.status === "Premium Partner"
  )
}

export const getMarketDemandBySpecies = (species: string): MarketDemand | undefined => {
  return marketDemand.find(demand => 
    demand.species.toLowerCase().includes(species.toLowerCase())
  )
}

export const getHighDemandSpecies = (): MarketDemand[] => {
  return marketDemand.filter(demand => 
    demand.demandLevel === "Hot" || demand.demandLevel === "High"
  )
}

export const getAverageMarketPrice = (): string => {
  const totalPrice = marketDemand.reduce((sum, demand) => {
    const price = parseFloat(demand.currentPrice.replace(/[₱,]/g, ''))
    return sum + price
  }, 0)
  const avgPrice = totalPrice / marketDemand.length
  return `₱${avgPrice.toFixed(2)}/kg`
}

export const getTotalRestaurants = (): number => {
  return restaurants.length
}

export const getRestaurantsByStatus = (status: Restaurant['status']): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.status === status)
}

// Chart helper functions
export const getDemandTrend = (species: string): number => {
  const latest = demandChartData[demandChartData.length - 1]
  const previous = demandChartData[demandChartData.length - 2]
  
  const latestValue = latest[species as keyof DemandChartData] as number
  const previousValue = previous[species as keyof DemandChartData] as number
  
  return ((latestValue - previousValue) / previousValue) * 100
}

export const getPriceTrend = (species: string): number => {
  const latest = priceChartData[priceChartData.length - 1]
  const previous = priceChartData[priceChartData.length - 2]
  
  const latestValue = latest[species as keyof PriceChartData] as number
  const previousValue = previous[species as keyof PriceChartData] as number
  
  return ((latestValue - previousValue) / previousValue) * 100
}

export const getTopDemandSpecies = (): { species: string; demand: number }[] => {
  const latest = demandChartData[demandChartData.length - 1]
  return [
    { species: 'Tilapia', demand: latest.Tilapia },
    { species: 'Milkfish', demand: latest.Milkfish },
    { species: 'Pompano', demand: latest.Pompano }
  ].sort((a, b) => b.demand - a.demand)
}

export const getHighestPriceSpecies = (): { species: string; price: number }[] => {
  const latest = priceChartData[priceChartData.length - 1]
  return [
    { species: 'Tilapia', price: latest.Tilapia },
    { species: 'Milkfish', price: latest.Milkfish },
    { species: 'Pompano', price: latest.Pompano }
  ].sort((a, b) => b.price - a.price)
}
