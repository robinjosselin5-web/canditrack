export interface IHealthStatus {
  status: 'ok'
  service: 'canditrack-api'
  timestamp: string
}

export function getHealthStatus(): IHealthStatus {
  return {
    status: 'ok',
    service: 'canditrack-api',
    timestamp: new Date().toISOString(),
  }
}
