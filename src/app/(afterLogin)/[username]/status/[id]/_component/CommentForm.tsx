'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { ChangeEventHandler, FormEvent, useRef, useState } from 'react'

import { Avatar } from '@/app/(afterLogin)/_component/_ui'
import { Post } from '@/model/Post'

type Props = {
  id: string
}

export default function CommentForm({ id }: Props) {
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<Array<{ dataUrl: string; file: File } | null>>([])
  const imageRef = useRef<HTMLInputElement>(null)
  const { data: me } = useSession()
  const queryClient = useQueryClient()
  const post = queryClient.getQueryData(['posts', id]) as Post

  const onClickButton = () => {
    imageRef.current?.click()
  }
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value)
  }

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('content', content)
      preview.forEach((p) => {
        if (p) {
          formData.append('images', p.file)
        }
      })
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/comments`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts', id, 'comments'] })
      setContent('')
      setPreview([])
    }
  })

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview((prevPreview) =>
            produce(prevPreview, (draft) => {
              draft[index] = {
                dataUrl: reader.result as string,
                file
              }
            })
          )
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview]
      prev[index] = null
      return prev
    })
  }

  if (!post) return null

  return (
    <form onSubmit={mutation.mutate} className="border-border border-b border-solid px-[16px] py-[14px]">
      <div className="flex flex-row">
        <div>
          <Avatar src={me?.user?.image as string} alt={me?.user?.id as string} className="mr-[8px]" />
        </div>
        <div className="flex grow-[1] flex-col">
          <textarea onChange={onChange} value={content} placeholder="Post your reply1" />
          <div className="flex">
            {preview.map(
              (v, index) =>
                v && (
                  <div key={index} className="flex" onClick={onRemoveImage(index)}>
                    <Image
                      width={40}
                      height={40}
                      src={v.dataUrl}
                      alt="미리보기"
                      className="w-[100%] max-h-[100px] object-contain"
                    />
                  </div>
                )
            )}
          </div>
          <div>
            <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onUpload} />
            <div className="flex flex-row justify-between">
              <button type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="fill-blue">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
              <button disabled={!content} className="button w-[auto] bg-blue text-white">
                ReplyReply
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
