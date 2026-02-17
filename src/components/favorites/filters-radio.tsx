'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface FitlersRadioProps {
  role: string
}

export const FiltersRadio = ({ role }: FitlersRadioProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentRole = searchParams.get('role') || 'all'

  const handleFilter = (role: string) => {
    const params = new URLSearchParams(searchParams)
    if (role) {
      if (role === 'all') {
        params.delete('role')
      } else {
        params.set('role', role)
      }
      params.set('page', '1')
    } else {
      params.delete('role')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <RadioGroup defaultValue={currentRole} onValueChange={handleFilter}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='all' id='all' />
        <Label htmlFor='actor'>{`All`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='actor' id='actor' />
        <Label htmlFor='actor'>{`Actors`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='director' id='director' />
        <Label htmlFor='director'>{`Directors`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='producer' id='producer' />
        <Label htmlFor='producer'>{`Producers`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='writer' id='writer' />
        <Label htmlFor='writer'>{`Writers`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='composer' id='composer' />
        <Label htmlFor='composer'>{`Composers`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='costume' id='costume' />
        <Label htmlFor='costume'>{`Costume Designer`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='musician' id='musician' />
        <Label htmlFor='musician'>{`Musician`}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='fictional' id='fictional' />
        <Label htmlFor='fictional'>{`Fictional Character`}</Label>
      </div>
    </RadioGroup>
  )
}
