import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import ActionButtons from './ActionButtons'
import PostArticle from './PostArticle'
import PostImages from './PostImages'

import type { Post } from '@/model/Post'

dayjs.locale('ko')
dayjs.extend(relativeTime)

type PostType = {
  noImage?: boolean
  post: Post
}

export default function Post({ noImage, post }: PostType) {
  let target = post

  if (post.Original) {
    target = post.Original
  }

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation()
  }

  return (
    <PostArticle post={target}>
      {post.Original && (
        <div className="flex gap-[6px] text-[14px] text-[#71767b] mb-[10px]">
          <svg viewBox="0 0 24 24" width={16} aria-hidden="true" className="fill-[#71767b]">
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          재게시했습니다
        </div>
      )}
      <div className="flex flex-row">
        <div className="mr-[8px]">
          <Link href={`/${target?.User.id}`} onClick={stopPropagation}>
            <Image
              width={40}
              height={40}
              src={target?.User.image}
              alt={target?.User.nickname}
              className="rounded-[100%]"
            />
          </Link>
        </div>
        <div className="grow-[1]">
          <div className="mb-[2px] flex items-center gap-[4px]">
            <Link href={`/${target?.User?.id}`} onClick={stopPropagation}>
              <span className="mr-[4px] font-bold text-[15px]">{target?.User.nickname}</span>
              <span className="text-[15px] text-gray">@{target?.User.id}</span>
            </Link>
            <span className="text-[15px] text-gray">·</span>
            <span className="text-[15px] text-gray">{dayjs(target?.createdAt).fromNow(true)}</span>
          </div>
          <div>{target?.content}</div>
          <div className="mt-[12px] overflow-hidden rounded-[16px]">{!noImage && <PostImages post={target} />}</div>
          <ActionButtons post={target} />
        </div>
      </div>
    </PostArticle>
  )
}
