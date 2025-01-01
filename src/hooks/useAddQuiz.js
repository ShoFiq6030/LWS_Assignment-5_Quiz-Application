import { AddQuizContext } from "../context";
import { useContext } from "react";

export const useAddQuiz = () => {
    return useContext(AddQuizContext);
}