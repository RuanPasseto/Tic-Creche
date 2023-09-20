/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from "react"
import { Book, FileEdit, Folders, Home, Search, SquareStack, Users } from "lucide-react"
import { NavItem } from "../Navigate"

export function Sidebar(){
  const [inputValue, setInputValue] = useState('')
  const [active, setMode] = useState(false)
  return(
    <>
      <div className="flex flex-col gap-6 border-r border-r-zinc-100 px-5 py-8 bg-neutral-200">
        <nav className="space-y-0.5">
          <NavItem title="Home" icon={Home}/>
          <NavItem title="Cursos" icon={Folders}/>
          <NavItem title="Módulos" icon={SquareStack}/>
          <NavItem title="Aulas" icon={Book}/>
          <NavItem title="Provas" icon={FileEdit}/>
          <NavItem title="Users" icon={Users}/>
        </nav>
      </div>
    </>
    
  )
}