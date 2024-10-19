'use client'

import { useMemo } from 'react'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'
import {
  Ghost,
  Skull,
  Candy,
  PartyPopper,
  Syringe,
  Axe,
  CandyCane,
  LucideIcon
} from 'lucide-react'

const icons: LucideIcon[] = [
  Axe,
  Ghost,
  Skull,
  Candy,
  CandyCane,
  PartyPopper,
  Syringe
]

interface IconProps {
  Icon: LucideIcon
  position: { left: string; top: string }
  animation: string
}

const IconWrapper = ({ Icon, position, animation }: IconProps) => (
  <Icon
    size={24}
    className={cn(
      'absolute text-primary opacity-15 duration-1000 dark:opacity-10',
      animation
    )}
    style={position}
  />
)

export function BgAnimationIcons() {
  const mounted = useMounted()

  const iconElements = useMemo(
    () =>
      Array.from({ length: 27 }, (_, i) => {
        const Icon = icons[Math.floor(Math.random() * icons.length)]
        return {
          Icon,
          position: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          },
          animation: i % 2 === 0 ? 'animate-wiggle' : 'animate-bounce'
        }
      }),
    []
  )

  if (!mounted) return null

  return (
    <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
      {iconElements.map((props, index) => (
        <IconWrapper key={index} {...props} />
      ))}
    </div>
  )
}
