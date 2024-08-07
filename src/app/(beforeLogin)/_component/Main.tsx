import Link from 'next/link'

export default function Main() {
  return (
    <main className="flex h-[100%] shrink-[1] grow-[1] flex-col justify-center">
      <div>
        <div className="flex flex-row-reverse">
          <div className="flex min-w-[45vw]">
            <div className="min-w-437 max-w-760 flex w-[100%] items-center p-20">
              <div>
                <h1 className="text-xl font-bold">Happening now</h1>
                <p className="mb-32 text-lg font-bold">Join today.</p>
                <Link
                  className="button bg-[#1d9cf0] text-[#fff]"
                  href="/i/flow/signup"
                >
                  Create account
                </Link>
                <p className="mb-20 mt-40 text-md font-bold">
                  Already have an account?
                </p>
                <Link className="button" href="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="flex min-h-[45vh] flex-1 justify-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="max-h-380 h-[100%] w-[100%] fill-[#fff] p-32"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
