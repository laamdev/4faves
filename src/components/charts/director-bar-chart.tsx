'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { getDecadeColor } from '@/lib/utils'

interface DirectorBarChartProps {
  data: {
    director: string
    count: number
  }[]
  maxDirectors?: number
}

export const DirectorBarChart = ({
  data,
  maxDirectors = 20
}: DirectorBarChartProps) => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    // Initial width
    updateWidth()

    // Add resize listener
    window.addEventListener('resize', updateWidth)

    // Cleanup
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Calculate left margin based on screen width
  const getLeftMargin = () => {
    if (screenWidth < 640) return 40 // sm
    return 100 // default
  }

  // Sort by count and take top N directors
  const chartData = data
    .sort((a, b) => b.count - a.count)
    .slice(0, maxDirectors)
    .map((item, idx) => ({
      name: item.director,
      value: item.count,
      // Use decade colors spread across the range for visual consistency
      fill: getDecadeColor(1920 + (idx * 100) / maxDirectors)
    }))

  const chartConfig = {
    value: {
      label: 'Movies'
    }
  } satisfies ChartConfig

  return (
    <Card className='flex h-fit flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Top 20 Directors</CardTitle>
        <CardDescription>
          The 20 directors with the most unique movies in the Favorites lists.
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-8 flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto h-[600px] w-full'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              layout='vertical'
              margin={{ top: 0, right: 16, bottom: 0, left: getLeftMargin() }}
            >
              <XAxis type='number' />
              <YAxis
                type='category'
                dataKey='name'
                width={getLeftMargin() - 10}
                style={{
                  fontSize: '12px'
                }}
                tickFormatter={value =>
                  screenWidth < 640
                    ? value.length > 15
                      ? `${value.slice(0, 15)}...`
                      : value
                    : value.length > 20
                      ? `${value.slice(0, 20)}...`
                      : value
                }
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null
                  const data = payload[0].payload
                  return (
                    <div className='rounded-lg border bg-background p-2 shadow-md'>
                      <h3 className='text-base font-bold'>{data.name}</h3>
                      <p className='text-sm'>{data.value} movies</p>
                    </div>
                  )
                }}
                cursor={{ fill: 'var(--muted)' }}
              />
              <Bar dataKey='value' radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
