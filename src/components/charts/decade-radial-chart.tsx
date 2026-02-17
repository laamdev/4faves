'use client'

import { TrendingUp } from 'lucide-react'
import { LabelList, RadialBar, RadialBarChart, Tooltip } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { getDecadeColor } from '@/lib/utils'

interface DecadeData {
  decade: number
  count: number
}

interface DecadeRadialChartProps {
  data: DecadeData[]
}

const chartConfig = {
  count: {
    label: 'Movies'
  },
  decade: {
    label: 'Decade'
  }
} satisfies ChartConfig

export function DecadeRadialChart({ data }: DecadeRadialChartProps) {
  const chartData = data.map(item => ({
    decade: `${item.decade}s`,
    count: item.count,
    fill: getDecadeColor(item.decade)
  }))

  const totalMovies = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className='flex h-fit flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Movies by Decade</CardTitle>
        <CardDescription>Distribution of movies across decades</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[350px]'
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={140}
          >
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null
                const data = payload[0].payload
                return (
                  <div className='rounded-lg border bg-background p-2 shadow-md'>
                    <h3 className='text-base font-bold'>{data.decade}</h3>
                    <p className='text-sm'>{data.count} movies</p>
                  </div>
                )
              }}
            />
            <RadialBar dataKey='count' background>
              <LabelList
                position='insideStart'
                dataKey='decade'
                className='fill-white capitalize mix-blend-luminosity'
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>
          Total of {totalMovies} movies across all decades
        </div>
      </CardFooter>
    </Card>
  )
}
