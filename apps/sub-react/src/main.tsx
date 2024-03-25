import React from 'react'
import ReactDOM from 'react-dom/client'
import { handleMicroData, unmountMicroApp } from '@packages/micro-app'
import App from './App.tsx'
import './index.css'
import 'virtual:uno.css'

if (window.__MICRO_APP_ENVIRONMENT__) {
  const app = ReactDOM.createRoot(document.getElementById('root') as unknown as HTMLElement)
  app.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  handleMicroData()
  // 监听卸载操作
  window.addEventListener('unmount', function () {
    app.unmount()
    unmountMicroApp()
  })
} else {
  ReactDOM.createRoot(document.getElementById('root') as unknown as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
