import dynamic from 'next/dynamic'

export const componentList = {
  corebutton: dynamic(() => import('@/docs/content/core/button')),
  coreavatar: dynamic(() => import('@/docs/content/core/avatar')),
}
