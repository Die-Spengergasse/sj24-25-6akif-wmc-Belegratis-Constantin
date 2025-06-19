import {isQuestion, Question} from "@/types/Question";
import {axiosInstance, createErrorResponse} from "../apiClient";

export async function getExamQuestions(moduleGuid: string) {
    try {
        const response = await axiosInstance.get<Question[]>(`/api/exam/${moduleGuid}`, {
            params: {
                moduleGuid: moduleGuid
            }
        });
        return response.data.filter(isQuestion);
    } catch (error) {
        return createErrorResponse(error);
    }
}