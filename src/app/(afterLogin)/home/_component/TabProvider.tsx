'use client'

import { useState, createContext, type PropsWithChildren } from 'react'

export const TabContext = createContext({
  tab: 'rec',
  setTab: (value: 'rec' | 'fol') => {},
})

export default function TabProvider({ children }: PropsWithChildren) {
  const [tab, setTab] = useState('rec')

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>
}
