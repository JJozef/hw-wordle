import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// TODO: move to types
type Transformation = {
  width?: number
  height?: number
  crop?: string
  quality?: string
  fetch_format?: string
  overlay?: {
    font_family: string
    font_size: number
    font_weight: string
    text: string
  }
  color?: string
  gravity?: string
  x?: number
  y?: number
}

export const uploadImageWithRandomLetters = async (
  imageUrl: string,
  word: string
) => {
  const transformations: Transformation[] = [
    { width: 800, height: 800, crop: 'fill' },
    { quality: 'auto', fetch_format: 'webp' }
  ]

  word.split('').forEach((letter) => {
    const x = Math.floor(Math.random() * 600) + 100
    const y = Math.floor(Math.random() * 600) + 100

    transformations.push({
      overlay: {
        font_family: 'arial',
        font_size: 80,
        font_weight: 'bold',
        text: letter
      },
      color: 'white',
      gravity: 'north_west',
      x: x,
      y: y
    })
  })

  const upload = await cloudinary.uploader.upload(imageUrl, {
    public_id: `halloween-wordless/${word}`,
    overwrite: true,
    tags: ['halloween-wordless'],
    context: `caption=${word}`,
    transformation: transformations
  })

  return upload
}
