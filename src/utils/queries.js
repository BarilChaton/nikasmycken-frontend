export const feedQuery = `*[_type == "inventoryItem" && ownerId==$userId] | order(_createdAt desc) {
    _id,
    inventoryId,
    title,
    inventoryType,
    category->{
      _id,
      name,
      subcategories
    },
    subcategoryKey,
    purchasePrice,
    listingPrice,
    status,
    amount,
    amountSold,

    "image": photos[0].asset->url,

    photos[]{
      _key,
      asset->{
        _id,
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
  *[_type == "inventoryItem" && ownerId==$userId]{
    status,
    listingPrice,
    amount,
    amountSold
  }
`

export const itemDetailsQuery = (id) => `
  *[_type == "inventoryItem" && _id == "${id}"][0]{
    _id,
    title,
    category->{
      _id,
      name,
      subcategories
    },
    subcategoryKey,
    purchasePrice,
    listingPrice,
    amount,
    amountSold,
    status,
  
    photos[]{
      _key,
      asset->{
        _id,
        url
      }
    }
  }
`

export const categoriesQuery = `
  *[_type == "category" && ownerId==$userId] | order(name asc){
      _id,
      name,
      subcategories[]{
          _key,
          name
      }
  }
`