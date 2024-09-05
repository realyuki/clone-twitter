'use client'

import { useContext } from 'react'
import { TabContext } from './TabProvider'

export default function Tab() {
  const { tab, setTab } = useContext(TabContext)

  const onClickRec = () => {
    setTab('rec')
  }
  const onClickFol = () => {
    setTab('fol')
  }

  return (
    <div className="flex flex-row border-border border-b border-solid">
      <div
        onClick={onClickRec}
        className="flex grow-[1] cursor-pointer justify-center text-[15px]"
      >
        <div className="relative flex h-[53px] items-center">
          For you
          <div
            hidden={tab === 'fol'}
            className="absolute bottom-0 h-[3px] w-[100%] bg-blue"
          ></div>
        </div>
      </div>
      <div
        onClick={onClickFol}
        className="flex grow-[1] cursor-pointer justify-center text-[15px]"
      >
        <div className="relative flex h-[53px] items-center">
          Following
          <div
            hidden={tab === 'rec'}
            className="absolute bottom-0 h-[3px] w-[100%] bg-blue"
          ></div>
        </div>
      </div>
    </div>
  )
}
