import { QuizContext } from "../context";
import { useContext } from "react";

export const useQuiz = () => {
    return useContext(QuizContext);
}
