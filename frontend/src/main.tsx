import ReactDOM from 'react-dom/client'

import { AllProviders } from '@/app/providers'

import '@/app/styles/global.css'

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<AllProviders />)
}
