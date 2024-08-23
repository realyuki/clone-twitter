'use client'

import { useState } from 'react'

export default function Tab() {
  const [tab, setTab] = useState('rec')

  const onClickRec = () => {
    setTab('rec')
  }
  const onClickFol = () => {
    setTab('fol')
  }

  return (
    <div>
      <div>Home</div>
      <div>
        <div onClick={onClickRec} className="cursor-pointer">
          For you
          <div hidden={tab === 'fol'}></div>
        </div>
      </div>
      <div>
        <div onClick={onClickFol} className="cursor-pointer">
          Following
          <div hidden={tab === 'rec'}></div>
        </div>
      </div>
    </div>
  )
}
