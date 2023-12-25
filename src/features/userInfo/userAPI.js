export function fetchUserInfo(token) {
  return new Promise(async (resolve) => {
      const response = await fetch(`/user`,{
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "auth-token": token     
        }})
      const data = await response.json();
      resolve({data});
  })
}
export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
      const response = await fetch(`/user`,{
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
