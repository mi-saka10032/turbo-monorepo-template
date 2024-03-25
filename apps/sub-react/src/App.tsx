import { useEffect, type FC, useState } from 'react'
import { useReactCount } from '@packages/hooks'
import { greetNest } from '@packages/request'
import { sendCountToMain } from '@packages/micro-app'
import reactLogo from './assets/react.svg'
import './App.css'

const App: FC = () => {
  const { add, count } = useReactCount()
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (count > 0) {
      sendCountToMain(count)
    }
  }, [count])

  const greet = (): void => {
    greetNest()
      .then((res) => {
        setMsg(res)
        add()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={handleClick}> */}
        <div className="flex justify-center items-center gap-x-6">
          <button onClick={greet}>Greet Nest</button>
        </div>
        <fieldset>
          <legend>点击Greet按钮查看服务端返回内容</legend>
          <p>
            服务端返回：<span className="font-bold">{msg}</span>，累计访问次数：{count}
          </p>
        </fieldset>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
