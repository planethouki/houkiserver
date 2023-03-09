import util from 'minecraft-server-util'
import { ServerStatus } from '~/types'

export default defineEventHandler((event) => {
  return util.status('houkiserver.com', 25565) as Promise<ServerStatus>
})
