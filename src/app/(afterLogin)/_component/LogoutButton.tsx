'use client'

export default function LogoutButton() {
  const me = {
    id: 'S2_realyuki',
    nickname: '깽자',
    image: '/realyuki.png'
  }

  const onLogout = () => {}

  return (
    <button
      onClick={onLogout}
      className="my-[14px] flex w-[90%] items-center justify-between"
    >
      <div className="flex w-[100%] items-center gap-[12px]">
        <div>
          <img
            src={me.image}
            alt={me.id}
            width={40}
            height={40}
            className="rounded-[100%]"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[15px]">{me.nickname}</span>
          <span className="text-[15px] text-gray">@{me.id}</span>
        </div>
      </div>
    </button>
  )
}
