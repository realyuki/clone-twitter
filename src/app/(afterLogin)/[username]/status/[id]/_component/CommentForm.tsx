'use client'

import { useRef, useState } from 'react'

export default function CommentForm() {
  const [content, setContent] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)

  const onClickButton = () => {}
  const onSubmit = () => {}
  const onChange = () => {}

  const me = {
    id: 'realyuki',
    image: '/realyuki.png'
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-border border-b border-solid px-[16px] py-[14px]"
    >
      <div className="flex flex-row">
        <div>
          <img
            width={40}
            src={me.image}
            alt={me.id}
            className="mr-[8px] rounded-[100%]"
          />
        </div>
        <div className="flex grow-[1] flex-col">
          <textarea onChange={onChange} placeholder="Post your reply" />
          <div>
            <input type="file" multiple hidden ref={imageRef} />
            <div className="flex flex-row justify-between">
              <button type="button" onClick={onClickButton}>
                <svg
                  width={24}
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
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
