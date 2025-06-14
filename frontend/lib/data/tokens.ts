export interface Token {
  id: string
  species: string
  scientificName: string
  quantity: string
  harvestDate: string
  progress: number
  status: string
  sold: string
  total: string
  daysRemaining: number
  buyers: number
  image?: string
}

export const tokens: Token[] = [
  {
    id: "AC-001",
    species: "Banagan",
    scientificName: "Panulirus longipes",
    quantity: "2,500 kg",
    harvestDate: "2024-03-15",
    progress: 75,
    status: "Growing",
    sold: "₱18,750",
    total: "₱25,000",
    daysRemaining: 12,
    buyers: 8,
    image: "/Panulirus-longipes.jpg",
  },
  {
    id: "AC-002",
    species: "Udang",
    scientificName: "Panulirus penicillatus",
    quantity: "1,800 kg",
    harvestDate: "2024-02-28",
    progress: 90,
    status: "Ready Soon",
    sold: "₱13,500",
    total: "₱15,000",
    daysRemaining: 5,
    buyers: 12,
    image: "/Panulirus-longipes.jpg",
  },
  {
    id: "AC-003",
    species: "Spiny Lobster",
    scientificName: "Panulirus spp.",
    quantity: "3,200 kg",
    harvestDate: "2024-04-20",
    progress: 45,
    status: "Growing",
    sold: "₱28,800",
    total: "₱32,000",
    daysRemaining: 28,
    buyers: 15,
    image: "/Panulirus-longipes.jpg",
  },
]

// Helper functions
export const getTokenById = (id: string): Token | undefined => {
  return tokens.find(token => token.id === id)
}

export const getTotalTokensCount = (): number => {
  return tokens.length
}

export const getTotalTokenValue = (): number => {
  return tokens.reduce((sum, token) => {
    return sum + parseInt(token.total.replace(/[₱,]/g, ''))
  }, 0)
}

export const getTotalSoldValue = (): number => {
  return tokens.reduce((sum, token) => {
    return sum + parseInt(token.sold.replace(/[₱,]/g, ''))
  }, 0)
}

export const getTokensByStatus = (status: string): Token[] => {
  return tokens.filter(token => token.status.toLowerCase() === status.toLowerCase())
}

export const getActiveTokensCount = (): number => {
  return tokens.filter(token => token.status !== "Harvested").length
}