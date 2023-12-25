// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/cartData`,{
        method: 'POST',
        body: JSON.stringify({product: item.productId, quantity:item.quantity, userId: item.userId}),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data});
  })
}
export function fetchCartProductsByUserId(userId) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/cartData`,{
        method: 'GET',
        headers: {
          "content-type": "application/json",
        }
      })
      const  data  = await response.json();
      resolve({data});
  })
}
export function updateCartProductQuantity(update) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/cartData`,{
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
export function deleteCartProduct(itemId) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/cartData/${itemId}`,{
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data : {id:itemId}});
  })
}