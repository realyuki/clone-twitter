import Link from 'next/link'

export default function Trend() {
  return (
    <Link href="/search?q=트렌드">
      <div>Trending in South Korea</div>
      <div>망그러진 곰</div>
    </Link>
  )
}
