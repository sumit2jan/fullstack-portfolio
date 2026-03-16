import React from 'react'
import About from './About';

const Home = ({name}) => {
  return (
    <div>
        <About name={name}/>
      {/* Home:{name} */}
    </div>
  )
}

export default Home;
