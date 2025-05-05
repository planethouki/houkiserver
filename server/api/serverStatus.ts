import util from 'minecraft-server-util'
import { ServerStatus, ServerStatusResponse } from '~/types'

export default defineEventHandler(async (event): Promise<ServerStatusResponse> => {
  try {
    const s = await util.status('mc.houkiserver.com', 25565) as ServerStatus
    return {
      result: s,
      isServerOnline: true,
    }
  } catch (e) {
    console.warn(e)
    return {
      isServerOnline: false,
    }
  }
})
