import { Module, isModule } from "@/types/Module";
import { axiosInstance, createErrorResponse, ErrorResponse } from "@/utils/apiClient";

export async function getModules(): Promise<Module[] | ErrorResponse> {
    try {
        const response = await axiosInstance.get<Module[]>('/api/modules');
        return response.data.filter(isModule);
    } catch (error) {
        return createErrorResponse(error);
    }
}