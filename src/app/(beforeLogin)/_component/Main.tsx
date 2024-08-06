import { Button } from '@/components/ui/button'

export default function Main() {
  return (
    <main className="flex flex-col justify-center shrink-[1] grow-[1] h-[100%]">
      <div>
        <div className="flex flex-row-reverse">
          <div className="flex min-w-[45vw]">
            <div className="flex items-center min-w-[437px] max-w-[760px] w-[100%] p-[20px]">
              <div>
                <h1 className="text-xl font-bold">Happening now</h1>
                <p className="text-lg font-bold mb-[32px]">Join today.</p>
                <Button>Create account</Button>
                <p className="mt-[40px] mb-[20px] text-md font-bold">
                  Already have an account?
                </p>
                <Button>Sign in</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-[1] justify-center min-h-[45vh]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-[#fff] w-[100%] h-[100%] max-h-[380px] p-[32px]"
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
