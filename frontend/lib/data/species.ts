export interface SpeciesRevenue {
  id: string
  name: string
  revenue: number
  percentage: number
  color: string
}

export const speciesRevenue: SpeciesRevenue[] = [
  {
    id: "tilapia",
    name: "Tilapia",
    revenue: 180450,
    percentage: 36,
    color: "bg-blue-500"
  },
  {
    id: "milkfish",
    name: "Milkfish", 
    revenue: 150230,
    percentage: 30,
    color: "bg-green-500"
  },
  {
    id: "pompano",
    name: "Pompano",
    revenue: 120890,
    percentage: 24,
    color: "bg-purple-500"
  }
]

export function getSpeciesRevenue(): SpeciesRevenue[] {
  return speciesRevenue
}

export function getTotalSpeciesRevenue(): number {
  return speciesRevenue.reduce((total, species) => total + species.revenue, 0)
}

export function getSpeciesById(id: string): SpeciesRevenue | undefined {
  return speciesRevenue.find(species => species.id === id)
}

export function formatCurrency(amount: number): string {
  return `₱${amount.toLocaleString()}`
}
