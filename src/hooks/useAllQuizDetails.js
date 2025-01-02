import { useContext } from "react"
import { AllQuizDetailsContext } from "../context"

export const useAllQuizDetails = () => {
    return useContext(AllQuizDetailsContext)


}