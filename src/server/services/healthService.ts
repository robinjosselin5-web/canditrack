export interface IHealthStatus {
  status: 'ok'
  service: 'candytrack-api'
  timestamp: string
}

export function getHealthStatus(): IHealthStatus {
  return {
    status: 'ok',
    service: 'candytrack-api',
    timestamp: new Date().toISOString(),
  }
}
