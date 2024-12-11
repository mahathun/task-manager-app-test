import {  handleApiCall } from './utils';
import { AxiosError } from 'axios';
import { TaskResponse } from '@/types/task';


describe('handleApiCall', () => {
    it('should return data when API call is successful', async () => {
        const mockResponse = { data: { id: 1, title: 'Test Task' }, error: null } as unknown as TaskResponse;
        const apiCall = jest.fn().mockResolvedValue(mockResponse);

        const result = await handleApiCall(apiCall);

        expect(apiCall).toHaveBeenCalled();
        expect(result).toEqual({ data: mockResponse.data, error: null });
    });

    it('should return error message when API call fails', async () => {
        const errorMessage = 'An error occurred';
        const axiosError = {
            response: { data: { message: errorMessage } },
        } as AxiosError;
        const apiCall = jest.fn().mockRejectedValue(axiosError);

        const result = await handleApiCall(apiCall);

        expect(apiCall).toHaveBeenCalled();
        expect(result).toEqual({ data: null, error: errorMessage });
    });

    it('should return default error message when API call fails without response data', async () => {
        const axiosError = {} as AxiosError;
        const apiCall = jest.fn().mockRejectedValue(axiosError);

        const result = await handleApiCall(apiCall);

        expect(apiCall).toHaveBeenCalled();
        expect(result).toEqual({ data: null, error: 'An unexpected error occurred' });
    });
});