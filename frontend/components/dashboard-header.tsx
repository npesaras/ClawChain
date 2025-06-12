"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Waves, User, Settings, LogOut, Bell, Fish, TrendingUp, ShoppingCart, HelpCircle } from "lucide-react"

interface DashboardHeaderProps {
  userRole?: "producer"
  forceRole?: "producer" // Force a specific role
}

export function DashboardHeader({ userRole: propUserRole, forceRole }: DashboardHeaderProps) {
  const [userRole, setUserRole] = useState<"producer" | "investor" | "buyer">("producer")

  useEffect(() => {
    // Force role takes precedence, then prop, then localStorage
    if (forceRole) {
      setUserRole(forceRole)
      localStorage.setItem("userRole", forceRole)
    } else if (propUserRole) {
      setUserRole(propUserRole)
      localStorage.setItem("userRole", propUserRole)
    } else {
      const storedRole = localStorage.getItem("userRole") as "producer" | "investor" | "buyer"
      if (storedRole) {
        setUserRole(storedRole)
      }
    }
  }, [propUserRole, forceRole])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
    window.location.href = "/"
  }

  const getRoleIcon = () => {
    switch (userRole) {
      case "producer":
        return <Fish className="h-4 w-4" />
    }
  }

  const getRoleColor = () => {
    switch (userRole) {
      case "producer":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-green-100 text-green-800"
      case "buyer":
        return "bg-purple-100 text-purple-800"
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">AquaChain</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href={`/dashboard/${userRole}`} className="text-gray-600 hover:text-blue-600 font-medium">
              Dashboard
            </Link>            {userRole === "producer" && (
              <>
                <Link href={`/dashboard/producer/tokens`} className="text-gray-600 hover:text-blue-600">
                  My Tokens
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className={getRoleColor()}>
            {getRoleIcon()}
            <span className="ml-1 capitalize">{userRole}</span>
          </Badge>

          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account ({userRole})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
