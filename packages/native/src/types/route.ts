export interface Route {
  key: string
  title: string
  keywords: string
  defaultOpen: boolean
  path?: string
  action?: () => any
  icon?: React.ReactNode
  subRoutes?: Route[]
}
