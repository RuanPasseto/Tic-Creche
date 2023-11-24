'use client'

import { useRouter } from 'next/navigation'
import * as Tab from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

interface TabItemProps {
    description: string,
    route: string
    value: string,
    isSelected?: boolean
}

export function TabItem({ description, route, value, isSelected = false }: TabItemProps) {
  const router = useRouter()
    return (
        <Tab.Trigger value={value} className='relative px-1 pb-4 text-sm font-medium text-gray-950 hover:text-blue-700 data-[state=active]:text-blue-600' onClick={()=> router.push(route)}>
            <span>
                {description}
            </span>
            {
                isSelected && (
                    <motion.div
                        layoutId='activeTab'
                        className='absolute -bottom-px right-0 left-0 h-px bg-green-600' />
                )
            }
        </Tab.Trigger>
    )
}