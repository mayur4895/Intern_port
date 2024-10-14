"use client"

import { useState, useEffect } from 'react'
import type { Post, Application } from '@prisma/client'
import { TrendingUp } from "lucide-react"
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Bar } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { PiDatabaseFill } from 'react-icons/pi'

interface ChartData {
  title: string
  applicationsCount: number
}

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ChartProps {
  posts: (Post & { applications: Application[] })[]
}

export function Chart({ posts }: ChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('latest')
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    let postsToShow
    switch (selectedPeriod) {
      case 'latest':
        postsToShow = sortedPosts.slice(0, 10)
        break 
      case 'oldest':
        postsToShow = sortedPosts.slice(-10)
        break
      default:
        postsToShow = sortedPosts.slice(0, 10)
    }

    const newChartData: ChartData[] = postsToShow.map(post => ({
      title: post.internshipProfile,
      applicationsCount: post.applications.length || 0, // Default to 0 if applications is undefined
    }))

    setChartData(newChartData)
  }, [posts, selectedPeriod])

  const formatTitle = (title: string) => {
    return title.length > 20 ? title.substring(0, 17) + '...' : title
  }

  if (chartData.length === 0) {
    return  <div className="p-5  border  rounded-md  h-[415px]  flex items-center w-full   justify-center"> 
      <div className=" flex flex-col items-center text-gray-500 gap-2">
      <PiDatabaseFill    size={42} className=" opacity-65"/>
         No data available for visualization
      </div>
      
      </div>  
  }

  return (
    <Card className="w-full">



      
      <CardHeader className=" flex   justify-between flex-row">
      <div>
      <CardTitle>Applications per Job Post</CardTitle>
      <CardDescription>Data visualization for applications</CardDescription>
      </div>
      <div>
      <Select onValueChange={setSelectedPeriod} defaultValue={selectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest 10 posts</SelectItem> 
            <SelectItem value="oldest">Oldest 10 posts</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full ml-0 p-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="horizontal" 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis 
                type="category" 
                dataKey="title" 
                width={200} 
                tickFormatter={formatTitle} 
              />
              <YAxis 
                type="number" 
                domain={[0, 'dataMax + 1']} 
                ticks={[6,5,4,3,2,1,0]} // Define custom ticks for the X-axis
              />
              <Tooltip formatter={(value) => [value, 'Applications']} />
              <Bar dataKey="applicationsCount"   fill="var(--color-applications)" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Visualizing application trends <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total applications per selected job posts
        </div>
      </CardFooter>
    </Card>
  )
}
