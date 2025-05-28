import { YM_ID } from '@/shared/lib/metrics'

declare global {
  interface Window {
    ym: (
      id: number,
      goal: 'reachGoal',
      action: string,
      data?: Record<string, unknown>,
    ) => void
  }
}

export function sendMetricEvent(action: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== 'production') console.log(data)

  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(YM_ID, 'reachGoal', action, data)
  }
}
