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
          <NavItem title="Home" icon={Home} route="/patrimonio"/>
          <NavItem title="Cursos" icon={Folders} route="/usuarios"/>
          <NavItem title="Módulos" icon={SquareStack} route=""/>
          <NavItem title="Aulas" icon={Book} route=""/>
          <NavItem title="Provas" icon={FileEdit} route=""/>
          <NavItem title="Users" icon={Users} route=""/>
        </nav>
      </div>
    </>
    
  )
}