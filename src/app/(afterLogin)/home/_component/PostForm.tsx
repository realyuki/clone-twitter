'use client'

import { useSession } from 'next-auth/react'
import { type ChangeEventHandler, useRef, useState } from 'react'

export default function PostForm() {
  const imageRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const { data: me } = useSession()

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value)
  }

  const onClickButton = () => {
    imageRef.current?.click()
  }

  return (
    <form>
      <div className="flex w-[100%] border-border border-b px-[16px] py-[12px]">
        <div>
          <img
            src={me?.user?.image as string}
            alt={me?.user?.id}
            width={40}
            height={40}
            className="mr-[8px] rounded-[100%]"
          />
        </div>
        <div className="grow-[1]">
          <textarea
            value={content}
            onChange={onChange}
            placeholder="What is happening?!"
            className="w-[100%] resize-none bg-transparent py-[12px] placeholder:text-gray"
          />
          <div>
            <input
              type="file"
              name="imageFiles"
              multiple
              hidden
              ref={imageRef}
            />
            <div className="flex items-center justify-between">
              <button type="button" onClick={onClickButton}>
                <svg
                  width={20}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-blue"
                >
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
              <button
                disabled={!content}
                className="button w-[auto] bg-blue text-white"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
