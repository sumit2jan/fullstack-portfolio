import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
  createContext
} from 'react'


// Creating a Context (for useContext example)
const UserContext = createContext()

const Home = (props) => {

  /* =========================
     useState
     =========================
     Used to store state
  */
  const [count, setCount] = useState(0)


  /* =========================
     useEffect
     =========================
     Runs when component loads
     or when dependency changes
  */
  useEffect(() => {
    console.log("Count changed:", count)
  }, [count]) // runs whenever count changes


  /* =========================
     useRef
     =========================
     Used to access DOM element
  */
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current.focus()
  }


  /* =========================
     useMemo
     =========================
     Prevents expensive
     calculation from running
     every render
  */
  const doubleCount = useMemo(() => {
    console.log("Calculating double...")
    return count * 2
  }, [count])


  /* =========================
     useCallback
     =========================
     Prevents function from
     recreating every render
  */
  const sayHello = useCallback(() => {
    console.log("Hello Sumit 👋")
  }, [])


  /* =========================
     useContext
     =========================
     Access global data
  */
  const user = useContext(UserContext)



  return (

    <div>

      {/* useState Example */}
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>


      {/* useMemo Example */}
      <h2>Double Count (useMemo): {doubleCount}</h2>


      {/* useRef Example */}
      <input ref={inputRef} placeholder="Type here..." />

      <button onClick={focusInput}>
        Focus Input
      </button>


      {/* useCallback Example */}
      <button onClick={sayHello}>
        Say Hello
      </button>


      {/* useContext Example */}
      <h3>User from Context: {user}</h3>

    </div>
  )
}


/*
Wrap Home inside Provider
so Context works
*/
const AppWrapper = () => {
  return (
    <UserContext.Provider value="Sumit">
      <Home />
    </UserContext.Provider>
  )
}

export default AppWrapper


// import React, { useEffect, useState } from 'react'

// const Home = (props) => {
//     const [count, setCount] = useState(0);
//     //useEffect(() => { setCount(count + 1); },[count])
//     return (
//         <div>
//             <h1>{count}</h1>
//             <button onClick={() => setCount(count + 1)}>
//                 Increase
//             </button>
//             <button onClick={() => setCount(count - 1)}>
//                 Decrease
//             </button>
//         </div>
//     )
// }
// export default Home
