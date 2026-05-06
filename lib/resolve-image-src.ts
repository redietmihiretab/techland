export type ResolveImageOptions = {
  seed: string
  width?: number
  height?: number
}

export function resolveImageSrc(input: string, options: ResolveImageOptions): string {
  // We have updated our products-data.json with real Unsplash photo IDs.
  // There is no need to override them with Picsum.
  return input
}
