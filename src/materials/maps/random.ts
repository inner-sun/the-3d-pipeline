import { DataTexture } from 'three'

const randomTileMap = (size: number) => {
  const width = size
  const height = size
  const pixelData = new Uint8ClampedArray(width * height * 4) // RGBA format

  // Fill pixel data with 
  // random black (0, 0, 0, 255) or
  // white (255, 255, 255, 255) pixels
  for (let i = 0; i < width * height; i++) {
    const isWhite = Math.random() > 0.5
    const color = isWhite ? 255 : 0
    const offset = i * 4
    pixelData[offset] = color       // Red
    pixelData[offset + 1] = color   // Green
    pixelData[offset + 2] = color   // Blue
    pixelData[offset + 3] = 255     // Alpha (opaque)
  }

  const texture = new DataTexture(pixelData, size, size)
  texture.needsUpdate = true

  return texture
}

export default randomTileMap