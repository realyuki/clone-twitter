import Trend from '../_component/Trend'
import SearchForm from '../_component/SearchForm'

export default function Explore() {
  return (
    <div>
      <div>
        <SearchForm />
      </div>
      <div>
        <h3>Trends for you</h3>
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
