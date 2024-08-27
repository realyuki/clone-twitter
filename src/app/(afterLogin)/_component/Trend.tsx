import Link from 'next/link'

export default function Trend() {
  return (
    <Link href="/search?q=트렌드" className="flex flex-col px-[16px] py-[12px]">
      <span className="text-[#71767b] text-[13px]">
        Trending in South Korea
      </span>
      <span className="font-bold text-[15px]">망그러진 곰</span>
      <span className="text-[#71767b] text-[13px]">309K posts</span>
    </Link>
  )
}
