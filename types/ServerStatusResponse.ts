import { ServerStatus } from "./ServerStatus";

export interface ServerStatusResponse {
  isServerOnline: boolean,
  result?: ServerStatus
}
