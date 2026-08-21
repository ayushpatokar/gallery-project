import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  async function getData() {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(response.data)

  }

  useEffect(function () {
    getData()
  }, [index])

  let printUserData = <h3 className='bg-gray-600 font-semibold text-sm absolute top-[50%] left-[48%] '> Loading...</h3>

  if (userData.length > 0) {
    printUserData = userData.map(function (item, idx) {
      return <a href={item.url} target='_blank'>
        <div className='h-70 w-70 text-center'>
          <img className='h-60 w-70 object-cover rounded-xl' src={item.download_url} alt="image" />
          <h2 className='font-semibold text-md'>{item.author}</h2>
        </div>
      </a>
    })
  }

  return (
    <div className='bg-black min-h-screen w-full text-white overflow-auto p-5'>
      
      <div className='flex flex-wrap gap-5'>{printUserData}</div>
      <div className='flex items-center justify-center gap-5'>
        <button 
        style={{opacity: index==1 ? 0.5 : 1}}
        onClick={() => {
        if (index > 1) {
            setIndex(index - 1)
            setUserData([])
          }
        }
        } className='bg-amber-300 text-black px-5 py-2 font-bold text-md rounded-md cursor-pointer active:scale-95'>Prev</button>
        <button onClick={() => {
            if (index < 10) {
            setIndex(index + 1)
            setUserData([])
          }
        }} className='bg-amber-300 text-black px-5 py-2 font-bold text-md rounded-md cursor-pointer active:scale-95'>Next</button>
      </div>
    </div>
  )
}

export default App