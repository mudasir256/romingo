export const subscribeToNewsletter = (email) => {
  if (!email) {
    return { success: false }
  }
  fetch(process.env.REACT_APP_BASE_ENDPOINT + `v2/mailchimp/signup/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  fetch(
    `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
      email
    )}&c=?`,
    { mode: "no-cors", method: "POST" }
  )
  return { success: true }
}

export const createAccount = async (email, password) => {
  const result =  await fetch(process.env.REACT_APP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        mutation CreateUserInput(
          $email: String!,
          $password: String!
        ){
          createUser(input: { email: $email, password: $password }) {
            id
            email
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    })
  })
  const data = await result.json()

  if (process.env.NODE_ENV === 'production') {
    subscribeToNewsletter(email)
  }

  return data
}

export const addNameToAccount = async (userId, name) => {
  const result =  await fetch(process.env.REACT_APP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        mutation createUserProfileInput(
          $userId: String!,
          $name: String!
        ){
          createUserProfile(input: { userId: $userId, name: $name }) {
            id
            email
            name
          }
        }
      `,
      variables: {
        userId: userId,
        name: name,
      }
    })
  })
  const data = await result.json()
  return data
}