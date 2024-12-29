import { QuestionsContext } from "../context";
import { useContext } from "react";

export const useQuestions = () => {
    return useContext(QuestionsContext);
}
