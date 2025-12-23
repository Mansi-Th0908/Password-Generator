import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //refhook
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+~|}{[]:;?><,./-='

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])



  useEffect(() => {
    PasswordGenerator()
  }, [PasswordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 5);
    navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {
    copyPasswordToClipboard()
  }, [copyPasswordToClipboard])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-center bg-gray-700 bg-clip-padding-40px space-y-4 '>
        <h1 className="text-white text-center font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-gray-800 placeholder-gray-400"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2 text-orange-500' >
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor pointer'
              onInput={(e) => setLength(Number(e.target.value))}
            />
            <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-2 text-orange-500' >
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numbersInput"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-2 text-orange-500' >
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App   