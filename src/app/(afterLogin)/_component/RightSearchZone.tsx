'use client'

import { usePathname } from 'next/navigation'
import SearchForm from './SearchForm'

export default function RightSearchZone() {
  const pathname = usePathname()
  const onChangeFollow = () => {}
  const onChangeAll = () => {}

  if (pathname === '/explore') {
    return null
  }

  if (pathname === '/search') {
    return (
      <>
        <div className="rounded-[16px] border border-border border-solid px-[16px] py-[12px]">
          <h3 className="font-bold text-[20px]">Search filters</h3>
        </div>
        <div className="rounded-[16px] border border-border border-solid px-[16px] py-[12px]">
          <p className="font-bold text-[15px]">People</p>
          <div className="flex justify-between py-[4px]">
            <label htmlFor="anyone" className="text-[15px]">
              From anyone
            </label>
            <input
              type="radio"
              name="pf"
              id="anyone"
              defaultChecked
              onChange={onChangeAll}
            />
          </div>
          <div className="flex justify-between py-[4px]">
            <label htmlFor="follower" className="text-[15px]">
              People you follow
            </label>
            <input
              type="radio"
              name="pf"
              id="follower"
              onChange={onChangeFollow}
            />
          </div>
        </div>
      </>
    )
  }

  return <SearchForm />
}
