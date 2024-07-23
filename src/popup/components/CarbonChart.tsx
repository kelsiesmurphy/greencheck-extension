"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig
} from "~components/ui/chart"

export function CarbonChart({ websiteCarbonData }) {
  const chartData = [
    {
      cleanerThan: websiteCarbonData.cleanerThan,
      fill: "hsl(var(--chart-2))"
    }
  ]

  const chartConfig = {
    cleanerThan: {
      label: "cleanerThan"
    }
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            endAngle={chartData[0].cleanerThan * 360}
            innerRadius={80}
            outerRadius={140}>
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="cleanerThan" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold">
                          {websiteCarbonData.rating}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Ranking
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Cleaner than {chartData[0].cleanerThan * 100}% of websites globally.
        </div>
        <div className="leading-none text-muted-foreground">
          How is this <a href="https://sustainablewebdesign.org/digital-carbon-ratings/" target="_blank" className="underline">rating calculated</a>?
        </div>
      </CardFooter>
    </Card>
  )
}
