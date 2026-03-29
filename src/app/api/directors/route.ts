import { NextResponse } from 'next/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  try {
    const directors = await fetchQuery(api.model.artists.listDirectors, {
      offset,
      limit
    })
    return NextResponse.json({ directors })
  } catch (error) {
    console.error('Error fetching directors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch directors' },
      { status: 500 }
    )
  }
}
