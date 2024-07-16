"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~components/ui/chart"

// Calculate 'from' and 'to' values
const now = new Date()
const from = new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString()
const to = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString()

const chartConfig = {
  actual: {
    label: "actual",
    color: "hsl(var(--chart-1))"
  },
  forecast: {
    label: "forecast",
    color: "hsl(var(--chart-4))"
  }
} satisfies ChartConfig

const formatDateLabel = (value) => {
  return new Date(value).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  })
}

export function IntensityChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.carbonintensity.org.uk/intensity/${from}/${to}`
        )
        const data = await response.json()

        // Preprocess the data to flatten the intensity object
        const formattedData = data.data.map((item) => ({
          from: item.from,
          to: item.to,
          forecast: item.intensity.forecast,
          actual: item.intensity.actual,
          index: item.intensity.index
        }))
        setChartData(formattedData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="from"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => formatDateLabel(value)}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="forecast"
          type="natural"
          fill="var(--color-forecast)"
          fillOpacity={0.4}
          stroke="var(--color-forecast)"
          stackId="a"
        />
        <Area
          dataKey="actual"
          type="natural"
          fill="var(--color-actual)"
          fillOpacity={0.4}
          stroke="var(--color-actual)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
