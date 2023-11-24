'use client'

import * as Tab from '@radix-ui/react-tabs'
import { TabItem } from '../TabItem'
import { useState } from 'react'

export function Tabs(){
  const [currentTab, setCurrentTab] = useState('tab1')
  return(
    <Tab.Root value={currentTab} onValueChange={(e) => setCurrentTab(e)}>
      <Tab.List className='mt-6 flex flex-col lg:flex-row items-center gap-5'> 
        <TabItem  route='/patrimonio' value='tab1'description='Patrimonios' isSelected={currentTab === 'Tab1'} />
        <TabItem  route='/locais' value='tab2' description='Locais' isSelected={currentTab === 'Tab2'}  />
        <TabItem  route='/usuarios' value='tab3' description='Usuarios' isSelected={currentTab === 'Tab3'} />
        <TabItem  route='/empresaManutencao' value='tab4' description='Empresa de manutenção' isSelected={currentTab === 'Tab4'}  />
      </Tab.List>
    </Tab.Root>
  )
}