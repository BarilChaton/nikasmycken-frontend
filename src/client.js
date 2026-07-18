import { createClient } from "@sanity/client"
import { createImageUrlBuilder } from "@sanity/image-url"

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2026-06-24',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN_2
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)