import Room from './_component/room'

export default function Home() {
  return (
    <div>
      <div className="px-[16px] py-[12px]">
        <h3 className="font-bold text-[20px]">Messages</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </div>
  )
}
