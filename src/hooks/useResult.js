import { ResultContext } from "../context"
import { useContext } from "react"
export const useResult = () => {
    return useContext(ResultContext)

}