import { ServerStatus } from "./serverStatus";

export interface ServerStatusResponse {
  isServerOnline: boolean,
  result?: ServerStatus
}
