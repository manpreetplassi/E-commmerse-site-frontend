export function addProduct(productData) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/products`,{
        method: 'POST',
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data});
  })
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/products/${update.id}`,{
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data});
  })
}