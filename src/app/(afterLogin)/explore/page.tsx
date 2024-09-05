import SearchForm from '../_component/SearchForm'
import TrendSection from './_component/TrendSection'

export default function Explore() {
  return (
    <div>
      <div className="px-[16px] py-[5px]">
        <SearchForm />
      </div>
      <div>
        <div className="px-[16px] py-[12px]">
          <h3 className="font-bold text-[20px]">Trends for you</h3>
        </div>
        <TrendSection />
      </div>
    </div>
  )
}
