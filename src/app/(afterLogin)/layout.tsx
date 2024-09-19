import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import FollowRecommendsSection from './_component/FollowRecommendsSection'
import LogoutButton from './_component/LogoutButton'
import NavMenu from './_component/NavMenu'
import RQProvider from './_component/RQProvider'
import RightSearchZone from './_component/RightSearchZone'
import TrendSection from './_component/TrendSection'

interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth()

  return (
    <RQProvider>
      <div className="flex">
        <div className="flex flex-[1]">
          <header className="flex grow-[1] basis-auto flex-col items-end">
            <section className="px-[8px]">
              <div className="w-[275px]">
                <Link href={`${session?.user ? 'home' : '/'}`}>
                  <Image src="/yRsRRjGO.jpg" alt="x.com" width={40} height={40} />
                </Link>
                {session?.user && (
                  <>
                    <nav>
                      <ul>
                        <NavMenu />
                      </ul>
                      <div className="w-[90%]">
                        <Link href="/compose/tweet" className="button w-[100%] bg-blue text-white">
                          <span>Post</span>
                        </Link>
                      </div>
                    </nav>
                    <LogoutButton />
                  </>
                )}
              </div>
            </section>
          </header>
          <div className="flex grow-[1]">
            <div className="flex w-[1050px] flex-row justify-between">
              <main className="flex w-[100%] max-w-[600px] shrink-[1] items-start border-border border-x">
                <div className="flex w-[100%] grow-[1] flex-col">{children}</div>
              </main>
              <section className="mr-[70px] flex w-[350px] flex-col gap-[12px] py-[12px]">
                <RightSearchZone />
                <TrendSection />
                <div className="rounded-[16px] border border-border border-solid">
                  <div className="px-[16px] py-[12px]">
                    <h3 className="font-bold text-[20px]">Who to follow</h3>
                  </div>
                  <div>
                    <FollowRecommendsSection />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        {modal}
      </div>
    </RQProvider>
  )
}
