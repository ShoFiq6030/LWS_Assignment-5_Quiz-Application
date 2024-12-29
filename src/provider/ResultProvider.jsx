import React, { useState } from 'react'
import { ResultContext } from '../context'

function ResultProvider({children}) {
   const [result,setResult] =useState({})
  return (
    <ResultContext.Provider value={{result,setResult}}>
      {children}
    </ResultContext.Provider>
  )
}

export default ResultProvider