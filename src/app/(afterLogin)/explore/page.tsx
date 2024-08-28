import SearchForm from '../_component/SearchForm'
import Trend from '../_component/Trend'

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
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  )
}
