import {isQuestion, Question} from "@/types/Question";
import {axiosInstance, createErrorResponse, ErrorResponse} from "@/utils/apiClient";
import {Answer, isAnswer} from "@/types/Answer";


export async function getQuestionsForTopic(topicGuid: string, moduleGuid: string): Promise<Question[] | ErrorResponse> {
    try {
        const response = await axiosInstance.get<Question[]>(`/api/questions`, {
            params: {
                topicGuid: topicGuid,
                moduleGuid: moduleGuid
            }
        });
        return response.data.filter(isQuestion);
    } catch (error) {
        return createErrorResponse(error);
    }
}

export async function checkAnswer(
    questionGuid: string,
    checkedAnswers: { guid: string; isChecked: boolean }[]
): Promise<Answer | ErrorResponse> {
    try {
        const payload = {
            checkedAnswers: checkedAnswers
                .map(answer => ({
                    guid: answer.guid,
                    isChecked: answer.isChecked
                }))
        };

        const response = await axiosInstance.post<Answer>(
            `/api/questions/${questionGuid}/checkanswers`,
            payload
        );

        return isAnswer(response.data) ? response.data : createErrorResponse(new Error("Invalid answer format"));
    } catch (error) {
        return createErrorResponse(error);
    }
}

