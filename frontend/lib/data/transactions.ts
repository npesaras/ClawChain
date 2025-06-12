// Transaction/Activity data for AquaChain platform

export interface Transaction {
  id: string
  type: "investment" | "token_creation" | "harvest" | "payment" | "withdrawal" | "funding_complete"
  title: string
  description: string
  amount?: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  relatedTokenId?: string
  investorName?: string
  icon: string
}

export const transactions: Transaction[] = [  {
    id: "txn_001",
    type: "investment",
    title: "New Investment Received",
    description: "Maria Santos invested in Atlantic Salmon Token #AC-001",
    amount: "₱15,000",
    timestamp: "2025-06-03T08:30:00Z",
    status: "completed",
    relatedTokenId: "AC-001",
    investorName: "Maria Santos",
    icon: "TrendingUp"
  },
  {
    id: "txn_002",
    type: "funding_complete",
    title: "Token Fully Funded",
    description: "Rainbow Trout Token #AC-002 reached 100% funding goal",
    amount: "₱85,000",
    timestamp: "2025-06-03T07:15:00Z",
    status: "completed",
    relatedTokenId: "AC-002",
    icon: "CheckCircle"
  },  {
    id: "txn_003",
    type: "harvest",
    title: "Harvest Completed",
    description: "Successfully harvested 2,500kg Sea Bass from Pond A1",
    amount: "₱390,000",
    timestamp: "2025-06-02T14:20:00Z",
    status: "completed",
    relatedTokenId: "AC-003",
    icon: "Fish"
  },
  {
    id: "txn_004",
    type: "payment",
    title: "Investor Payment Sent",
    description: "ROI payment distributed to 12 investors for Token #AC-001",
    amount: "₱52,750",
    timestamp: "2025-06-02T11:45:00Z",
    status: "completed",
    relatedTokenId: "AC-001",
    icon: "DollarSign"
  },
  {
    id: "txn_005",
    type: "token_creation",
    title: "New Token Created",
    description: "Arctic Char Token #AC-005 created for Pond B2",    amount: "₱120,000",
    timestamp: "2025-06-01T16:30:00Z",
    status: "completed",
    relatedTokenId: "AC-005",
    icon: "Plus"
  },
  {
    id: "txn_006",
    type: "investment",
    title: "Investment Received",
    description: "Carlos Rodriguez invested in Sea Bass Token #AC-003",
    amount: "₱25,000",
    timestamp: "2025-06-01T13:22:00Z",
    status: "completed",
    relatedTokenId: "AC-003",
    investorName: "Carlos Rodriguez",
    icon: "TrendingUp"
  },
  {
    id: "txn_007",
    type: "withdrawal",
    title: "Funds Withdrawn",
    description: "Withdrew earnings to bank account ending in 4521",
    amount: "₱75,000",
    timestamp: "2025-05-31T10:15:00Z",
    status: "completed",
    icon: "ArrowUpRight"
  },  {
    id: "txn_008",
    type: "investment",
    title: "Investment Received",
    description: "Ana Dela Cruz invested in Rainbow Trout Token #AC-002",
    amount: "₱18,500",
    timestamp: "2025-05-31T09:08:00Z",
    status: "completed",
    relatedTokenId: "AC-002",
    investorName: "Ana Dela Cruz",
    icon: "TrendingUp"
  },
  {
    id: "txn_009",
    type: "payment",
    title: "Investor Payment Pending",
    description: "Processing ROI payment for Token #AC-001 investors",
    amount: "₱43,200",
    timestamp: "2025-05-30T15:45:00Z",
    status: "pending",
    relatedTokenId: "AC-001",
    icon: "Clock"
  },
  {
    id: "txn_010",
    type: "harvest",
    title: "Harvest Scheduled",
    description: "Atlantic Salmon harvest scheduled for Pond A3",    amount: "₱320,000",
    timestamp: "2025-05-30T08:00:00Z",
    status: "pending",
    relatedTokenId: "AC-004",
    icon: "Calendar"
  }
]

// Helper functions
export const getRecentTransactions = (limit: number = 5): Transaction[] => {
  return transactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

export const getTransactionsByType = (type: Transaction['type']): Transaction[] => {
  return transactions.filter(txn => txn.type === type)
}

export const getTransactionsByStatus = (status: Transaction['status']): Transaction[] => {
  return transactions.filter(txn => txn.status === status)
}

export const getTotalTransactionValue = (): string => {
  const total = transactions
    .filter(txn => txn.amount && txn.status === 'completed')
    .reduce((sum, txn) => {
      const amount = parseInt(txn.amount!.replace(/[^0-9]/g, ''))
      return sum + amount
    }, 0)
  
  return `₱${total.toLocaleString()}`
}

export const formatTransactionTime = (timestamp: string): string => {
  const now = new Date()
  const txnTime = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - txnTime.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - txnTime.getTime()) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}
