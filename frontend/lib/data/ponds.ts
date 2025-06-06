export interface Pond {
  id: string
  name: string
  location: string
  size: string
  capacity: string
  currentStock: string
  utilization: number
  status: string
  waterTemp: string
  oxygenLevel: string
  phLevel: string
  lastFed: string
  activeTokens: number
  totalValue: string
  image: string
}

export const ponds: Pond[] = [
  {
    id: "pond-a",
    name: "Pond A",
    location: "North Sector",
    size: "2,500 m²",
    capacity: "15,000 kg",
    currentStock: "12,500 kg",
    utilization: 83,
    status: "optimal",
    waterTemp: "18.5°C",
    oxygenLevel: "8.2 mg/L",
    phLevel: "7.1",
    lastFed: "2 hours ago",
    activeTokens: 3,
    totalValue: "₱45,000",
    image: "/pondA.jpg",
  },
  {
    id: "pond-b",
    name: "Pond B",
    location: "East Sector",
    size: "1,800 m²",
    capacity: "10,000 kg",
    currentStock: "8,200 kg",
    utilization: 82,
    status: "good",
    waterTemp: "17.8°C",
    oxygenLevel: "7.9 mg/L",
    phLevel: "7.3",
    lastFed: "1 hour ago",
    activeTokens: 2,
    totalValue: "₱28,000",
    image: "/pondB.jpg",
  },
  {
    id: "pond-c",
    name: "Pond C",
    location: "South Sector",
    size: "3,200 m²",
    capacity: "20,000 kg",
    currentStock: "16,800 kg",
    utilization: 84,
    status: "attention",
    waterTemp: "19.2°C",
    oxygenLevel: "7.5 mg/L",
    phLevel: "6.9",
    lastFed: "30 minutes ago",
    activeTokens: 4,
    totalValue: "₱62,000",
    image: "/pondC.jpg",
  },
]

// Helper functions
export const getPondById = (id: string): Pond | undefined => {
  return ponds.find(pond => pond.id === id)
}

export const getTotalPonds = (): number => {
  return ponds.length
}

export const getTotalCapacity = (): string => {
  const totalCapacityKg = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.capacity.replace(/[^0-9]/g, ''))
  }, 0)
  return `${totalCapacityKg.toLocaleString()} kg`
}

export const getTotalCurrentStock = (): string => {
  const totalStockKg = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.currentStock.replace(/[^0-9]/g, ''))
  }, 0)
  return `${totalStockKg.toLocaleString()} kg`
}

export const getTotalActiveTokens = (): number => {
  return ponds.reduce((sum, pond) => sum + pond.activeTokens, 0)
}

export const getTotalValue = (): string => {
  const totalValue = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.totalValue.replace(/[₱,]/g, ''))
  }, 0)
  return `₱${totalValue.toLocaleString()}`
}