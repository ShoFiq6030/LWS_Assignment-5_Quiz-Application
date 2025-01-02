import React, { useState } from 'react'
import { AllQuizDetailsContext } from '../context'

function AllQuizDetailsProvider({children}) {
    const [allQuizDetails,setAllQuizDetails]=useState([])
  return (
    <AllQuizDetailsContext.Provider value={{allQuizDetails,setAllQuizDetails}}>
        {children}
    </AllQuizDetailsContext.Provider>
  )
}

export default AllQuizDetailsProvider