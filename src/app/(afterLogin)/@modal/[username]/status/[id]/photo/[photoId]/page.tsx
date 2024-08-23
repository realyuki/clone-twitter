import { faker } from '@faker-js/faker'

export default function Default() {
  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text(),
    },
  }

  return (
    <div>
      <img src={photo.link} alt={photo.Post?.content} />
      <div style={{ backgroundImage: `url(${photo.link})` }} />
    </div>
  )
}
