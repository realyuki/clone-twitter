'use client'

export default function LogoutButton() {
  const me = {
    id: 'S2_realyuki',
    nickname: '깽자',
    image: '/realyuki.png',
  }

  const onLogout = () => {}

  return (
    <button onClick={onLogout} className=" my-[14px] flex w-[90%] items-center justify-between">
      <div className="flex w-[100%] items-center gap-[12px]">
        <div>
          <img src={me.image} alt={me.id} width={40} height={40} className="rounded-[100%]" />
        </div>
        <div className="flex flex-col items-start">
          <div>{me.nickname}</div>
          <div>@{me.id}</div>
        </div>
      </div>
      {/* <div>
        <svg width={18} viewBox='0 0 24 24' aria-hidden='true' className='fill-white'>
          <g>
            <path d='M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
          </g>
        </svg>
      </div> */}
    </button>
  )
}
