import React, { useState } from 'react'

const Home = (props) => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </div>
    )
}

export default Home
