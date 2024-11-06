'use client'

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { produce } from 'immer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChangeEventHandler, FormEvent, FormEventHandler, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { Post } from '@/model/Post'
import { useModalStore } from '@/store/modal'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function TweetModal() {
  const [content, setContent] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)
  const { data: me } = useSession()
  const router = useRouter()
  const [preview, setPreview] = useState<
    Array<{
      dataUrl: string
      file: File
    } | null>
  >([])

  const modalStore = useModalStore()
  const queryClient = useQueryClient()

  const parent = modalStore.data

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
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })
    }
  })

  const comment = useMutation({
    mutationFn: (e: FormEvent) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('content', content)
      preview.forEach((p) => {
        if (p) {
          formData.append('images', p.file)
        }
      })
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${parent?.postId}/comments`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })
    },
    async onSuccess(response) {
      const newPost = await response.json()
      setContent('')
      setPreview([])
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey)

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey)

          if (value && 'pages' in value) {
            // 여러 페이지가 있는 경우
            const updatedValue = produce(value, (draft) => {
              const obj = draft.pages.flat().find((v) => v.postId === parent?.postId)
              if (obj) {
                const pageIndex = draft.pages.findIndex((page) => page.includes(obj))
                const index = draft.pages[pageIndex].findIndex((v) => v.postId === parent?.postId)

                draft.pages[pageIndex][index].Comments = [
                  { userId: me?.user?.email as string },
                  ...draft.pages[pageIndex][index].Comments
                ]
                draft.pages[pageIndex][index]._count.Comments += 1

                draft.pages[0].unshift(newPost)
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          } else if (value) {
            // 단일 포스트 데이터인 경우
            const updatedValue = produce(value, (draft) => {
              if (draft.postId === parent?.postId) {
                draft.Comments = [{ userId: me?.user?.email as string }, ...draft.Comments]
                draft._count.Comments += 1
              }
            })

            queryClient.setQueryData(queryKey, updatedValue)
          }
        }
      })

      await queryClient.invalidateQueries({ queryKey: ['trends'] })
    },
    onError(error) {
      console.error(error)
      alert('업로드 중 에러가 발생했습니다.')
    },
    onSettled() {
      modalStore.reset()
      router.back()
    }
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (modalStore.mode === 'new') {
      mutation.mutate(e)
    } else {
      comment.mutate(e)
    }
  }

  const onClickClose = () => {
    router.back()
  }

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value)
  }

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview]
      prev[index] = null
      return prev
    })
  }

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview]
            prev[index] = {
              dataUrl: reader.result as string,
              file
            }
            return prev
          })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const onClickButton = () => {
    imageRef.current?.click()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="w-[600px] rounded-16 bg-black p-16">
        <button onClick={onClickClose}>
          <svg width={20} viewBox="0 0 24 24" aria-hidden="true" className="fill-white">
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <form onSubmit={onSubmit}>
          {modalStore.mode === 'comment' && parent && (
            <div>
              <div className="flex gap-[8px] text-[15px]">
                <div>
                  <Image
                    width={40}
                    height={40}
                    src={parent.User.image}
                    alt={parent.User.id}
                    className="rounded-[50%]"
                  />
                </div>
                <div>
                  <div className="flex text-gray">
                    <Link href={`/${parent.User.id}`} className="text-white mr-[4px]">
                      {parent.User.nickname}
                    </Link>
                    <div>{`@${parent.User.id}`}</div>
                    <div className="px-[4px]">·</div>
                    <div>{dayjs(parent?.createdAt).fromNow(true)}</div>
                  </div>
                  <div>{parent.content}</div>
                  <div className="mt-[12px] text-gray">
                    Replying to <span className="text-blue">@{parent.User.id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-[8px] mt-[12px]">
            <div>
              <Image
                width={40}
                height={40}
                src={me?.user?.image as string}
                alt={me?.user?.email as string}
                className="rounded-[50%]"
              />
            </div>
            <div>
              <TextareaAutosize
                placeholder={modalStore.mode === 'comment' ? 'Post your reply' : '무슨 일이 일어나고 있나요?'}
                value={content}
                onChange={onChange}
                className="w-[100%] resize-none bg-transparent py-[12px] placeholder:text-gray"
              />
            </div>
          </div>
          <div>
            {preview.map(
              (v, index) =>
                v && (
                  <div key={index} style={{ flex: 1 }} onClick={onRemoveImage(index)}>
                    <Image
                      src={v.dataUrl}
                      width={40}
                      height={40}
                      alt="미리보기"
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                        maxHeight: 100
                      }}
                    />
                  </div>
                )
            )}
          </div>
          <div>
            <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onUpload} />
            <div className="flex justify-between">
              <button type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="fill-blue">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
              <button className="button w-[auto] text-white bg-blue" disabled={!content}>
                {modalStore.mode === 'comment' ? 'Reply' : 'Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
