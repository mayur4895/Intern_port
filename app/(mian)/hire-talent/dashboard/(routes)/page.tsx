'use client'
import { useCompanyStore } from '@/hooks/use-companydata';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dashboard } from '@/components/hire-talent/Dashboard';
import { TooltipProvider } from '@/components/ui/tooltip';

const DashboardPage = () => { 
  return (
 
  <Dashboard/>
 
  )
}

export default DashboardPage
