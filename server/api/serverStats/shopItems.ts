export default defineEventHandler(async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  setHeader(event, 'Content-Type', 'application/json')

  return $fetch('https://houkiserverstats.z31.web.core.windows.net/shopItems.json', { headers })
})
