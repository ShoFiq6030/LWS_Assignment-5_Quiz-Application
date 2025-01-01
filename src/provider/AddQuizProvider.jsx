import React, { useState } from 'react'
import { AddQuizContext } from '../context'
function AddQuizProvider({children}) {
    const [addQuiz,setAddQuiz]= useState({})
  return (
    <AddQuizContext.Provider value={{addQuiz,setAddQuiz}}>
      {children}
    </AddQuizContext.Provider>
    
  )
}

export default AddQuizProvider