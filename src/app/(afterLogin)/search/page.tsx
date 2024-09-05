import BackButton from '../_component/BackButton'
import SearchForm from '../_component/SearchForm'
import SearchResult from './_component/SearchResult'
import Tab from './_component/Tab'

type SearchProps = {
  searchParams: {
    q: string
    f?: string
    pf?: string
  }
}

export default function Search({ searchParams }: SearchProps) {
  return (
    <>
      <div className="flex items-center gap-[20px] px-[16px] py-[5px]">
        <div>
          <BackButton />
        </div>
        <div className="grow-[1]">
          <SearchForm q={searchParams.q} />
        </div>
        <div>
          <button>
            <svg
              width={20}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-white"
            >
              <g>
                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <Tab />
      <div>
        <SearchResult searchParams={searchParams} />
      </div>
    </>
  )
}
