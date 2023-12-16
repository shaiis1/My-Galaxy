export const GetRequest = async (apiEndpoint: string) => {
    const res = await fetch(`http://localhost:3010/api/v1/${apiEndpoint}`)
  
    return res.json()
  }

  export const PostRequest = async (
    apiEndpoint: string,
    body: any
  ) => {
    const res = await fetch(`http://localhost:3010/api/v1/${apiEndpoint}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
  
    return res.json()
  }