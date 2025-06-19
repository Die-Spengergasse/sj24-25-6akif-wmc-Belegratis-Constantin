import {axiosInstance, createErrorResponse, ErrorResponse} from "@/utils/apiClient";
import {isTopic, Topic} from "@/types/Topic";

export async function getTopicsForModule(moduleGuid: string): Promise<Topic[] | ErrorResponse> {
    try {
        const response = await axiosInstance.get<Topic[]>(`/api/Topics`, {
            params: {
                assignedModule: moduleGuid
            }
        });
        return response.data.filter(isTopic);
    }
    catch (error) {
        return createErrorResponse(error);
    }
}