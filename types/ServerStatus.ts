export interface ServerStatus {
  version: {
    name: string,
    protocol: number
  },
  players: {
    online: number,
    max: number,
    sample: null,
  },
  motd: {
    raw: string,
    clean: string,
    html: string,
  },
  favicon: string,
  srvRecord: null,
  roundTripLatency: number,
}
