
export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
      const response = await fetch(`/orders`,{
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json"
        }
      })
      const data = await response.json();
      resolve({data});
  })
}
export function fetchOrderByUserId() {
  return new Promise(async (resolve, reject) => {
      const response = await fetch('/orders')
      try {
        if(response.ok){
          const data = await response.json();
        resolve({data});
        }
        else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
  })
}
// admin work
export function fetchAllOrders(sort, pagination) {
  return new Promise(async (resolve) => {
    let quaryString = ''
    for(let key in pagination){
        quaryString += `${key}=${pagination[key]}&`
    }
    for(let key in sort){
        quaryString += `${key}=${sort[key]}&`
    }      
    const response = await fetch(`/orders/admin?${quaryString}`,{
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("Auth_Token")
      }
    })
      const data = await response.json();
      const totalOrders = await response.headers.get('X-Total-Count');
      resolve({data: {orders: data, totalOrders: +totalOrders}});
  })
}
export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
      const response = await fetch(`/orders/${order.id}`,{
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data});
  })
}
export function removeOrders(orderId) {
  return new Promise(async (resolve, reject) => {
      const response = await fetch(`/orders/${orderId}`,{
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      resolve({data});
  })
}