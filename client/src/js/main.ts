async function getImages(page: number) {
  const url = `http://localhost:9090/photo?page=${page}`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })

  return await response.json(); // Parse json
}

