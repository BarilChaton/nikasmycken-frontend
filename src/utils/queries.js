export const feedQuery = `*[_type == "inventoryItem"] | order(_createdAt desc) {
    _id,
    inventoryId,
    title,
    inventoryType,
    category,
    purchasePrice,
    listingPrice,
    status,
    amount,
    amountSold,

    "image": photos[0].asset->url,

    photos[]{
      _key,
      asset->{
        url
      }
    },

    _createdAt
  } `

export const searchQuery = (searchTerm) => {
  const query = `
    *[
      _type == "inventoryItem" &&
      (
        title match "${searchTerm}*" ||
        category match "${searchTerm}*" ||
        inventoryId match "${searchTerm}*" ||
        description match "${searchTerm}*"
      )
    ] | order(_createdAt desc) {
      _id,
      inventoryId,
      title,
      inventoryType,
      category,
      description,
      purchasePrice,
      listingPrice,
      status,
      amount,

      "image": photos[0].asset->url
    }
  `

  return query
}

export const dashboardQuery = `
  *[_type == "inventoryItem"]{
    status,
    listingPrice,
    amount
  }
`