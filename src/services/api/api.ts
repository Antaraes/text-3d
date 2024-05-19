import API from './interceptor';

export const getAllModels = () => API.get('/products');
export const fetch3DModel = (id: string) => API.get(`/generate3d/${id}`);
export const generate3dModel = (data: any) => API.post('/generate3d', data);
