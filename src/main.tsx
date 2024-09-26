import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { enableMSW } from './api/moks/index.ts'
import { App } from './app.tsx'

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
