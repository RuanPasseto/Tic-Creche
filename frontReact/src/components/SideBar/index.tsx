'use client'
/* eslint-disable @next/next/no-img-element */
import * as Collapsible from '@radix-ui/react-collapsible'
import { Tabs } from '../Tabs';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';

export function NavBar(){
  const [navBarOpen, setNavBarOpen] = useState(false)
  return(
    <div className="h-20 flex px-4 lg:px-12 py-2 shadow-lg fixed w-full bg-stone-300 z-20">
      <img src="logo.jpg" alt="logo"/>
      <div className="flex lg:hidden ml-auto items-center">
        <Collapsible.Root onOpenChange={setNavBarOpen}>
          <Collapsible.Trigger asChild>
            <Button variant='ghost'>
              {!navBarOpen ? <Menu/> : <X/>}
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content forceMount asChild
            className="absolute top-0 right-0flex flex-1 flex-col gap-6
            shadow-lg border border-zinc-200 px-10
             right-1 data-[state=closed]:hidden 
            data-[state=close]:animate-slideUpAndFade 
            data-[]:animate-slideDownAndFade">
           <div className='flex flex-1 flex-col gap-6 bg-stone-300 w-80 h-screen'>
           <Collapsible.Trigger asChild>
            <Button variant='ghost'>
              {!navBarOpen ? <Menu/> : <X/>}
            </Button>
          </Collapsible.Trigger>
            
              <Tabs />
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
      <div className="hidden lg:flex ml-auto">
        <Tabs/>
      </div>
    </div>
  )

}