import React from 'react'

function Banner() {
  return (
    <div className="h-[20vh] md:h-[60vh] bg-cover bg-center flex items-end" style={{backgroundImage: `url(https://wallpaperaccess.com/full/2564207.jpg)`}}>
            <div className='text-white text-xl text-center w-full font-mono bg-gray-900/70 p-2'>Star Wars</div>
    </div>
  )
}

export default Banner