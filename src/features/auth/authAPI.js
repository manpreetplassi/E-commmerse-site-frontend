// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
      const response = await fetch(`/auth/signup`,{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      if(data.errors){
        reject({msg: data.errors.msg})
      }else{
        resolve({data});
      }
  })
}

export function logInUser(logInfo) {
  return new Promise(async (resolve, reject) => {
    try {
    const email = logInfo.email;
    const password = logInfo.password;
      const response = await fetch(`/auth/login`,{
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }
  })
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check');
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}


export function signOut() {
  return new Promise(async (resolve, reject) => {
      const response = await fetch('/auth/signout');
      if (response.ok) {
        const text = await response.text();
        resolve(text);
      } else {
        const error = await response.text();
        reject(error);
      }
})}