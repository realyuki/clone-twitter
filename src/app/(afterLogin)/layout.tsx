import Link from 'next/link'
import Image from 'next/image'
import NavMenu from './_component/NavMenu'
import TrendSection from './_component/TrandSection'
import FollowRecommend from './_component/FollowRecommend'
import LogoutButton from './_component/LogoutButton'
import RightSearchZone from './_component/RightSearchZone'

type Props = { children: React.ReactNode; modal: React.ReactNode }

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className="flex">
      <div className="flex flex-[1]">
        <header className="flex grow-[1] basis-auto flex-col items-end">
          <section className="px-[8px]">
            <div className="w-[275px]">
              <Link href="/home">
                <Image src="/yRsRRjGO.jpg" alt="x.com" width={40} height={40} />
              </Link>
              <nav>
                <ul>
                  <NavMenu />
                </ul>
                <div className="w-[90%]">
                  <Link href="/compose/tweet" className="button w-[100%] bg-[#1d9bf0] text-white">
                    <span>Post</span>
                  </Link>
                </div>
              </nav>
              <LogoutButton />
            </div>
          </section>
        </header>
        <div className="flex grow-[1]">
          <div className="flex w-[1050px] flex-row justify-between">
            <main className="flex w-[100%] max-w-[600px] shrink-[1] items-start">
              <div className="flex w-[100%] grow-[1] flex-col">{children}</div>
            </main>
            <section className="mr-[70px] w-[350px]">
              <RightSearchZone />
              <TrendSection />
              <div>
                <h3>Who to follow</h3>
                <FollowRecommend />
                <FollowRecommend />
                <FollowRecommend />
              </div>
            </section>
          </div>
        </div>
      </div>
      {modal}
    </div>
  )
}
