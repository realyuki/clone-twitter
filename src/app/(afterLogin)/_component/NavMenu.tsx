'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function NavMenu() {
  const segment = useSelectedLayoutSegment()
  const me = {
    id: 'realyuki'
  }

  return (
    <>
      <li>
        <Link
          href="/home"
          className="flex h-[58px] flex-row items-center gap-[20px]"
        >
          {segment === 'home' ? (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                </g>
              </svg>
              <div>Home</div>
            </>
          ) : (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                </g>
              </svg>
              <div>Home</div>
            </>
          )}
        </Link>
      </li>
      <li>
        <Link
          href="/explore"
          className="flex h-[58px] flex-row items-center gap-[20px]"
        >
          {segment && ['search', 'explore'].includes(segment) ? (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
              <div>Explore</div>
            </>
          ) : (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
              <div>Explore</div>
            </>
          )}
        </Link>
      </li>
      <li>
        <Link
          href="/messages"
          className="flex h-[58px] flex-row items-center gap-[20px]"
        >
          {segment === 'messages' ? (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
              <div>Messages</div>
            </>
          ) : (
            <>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-white"
              >
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
              <div>Messages</div>
            </>
          )}
        </Link>
      </li>
      {me?.id && (
        <li>
          <Link
            href={`/${me?.id}`}
            className="flex h-[58px] flex-row items-center gap-[20px]"
          >
            {segment === me.id ? (
              <>
                <svg
                  width={26}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-white"
                >
                  <g>
                    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                  </g>
                </svg>
                <div>Profile</div>
              </>
            ) : (
              <>
                <svg
                  width={26}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-white"
                >
                  <g>
                    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                  </g>
                </svg>
                <div>Profile</div>
              </>
            )}
          </Link>
        </li>
      )}
    </>
  )
}
