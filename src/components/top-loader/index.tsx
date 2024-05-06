'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export default function TopLoader() {
  return (
    <AppProgressBar
      height="4px"
      color="#3687FF"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}
