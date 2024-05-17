import API from './interceptor';

export const getAllModels = () => API.get('/products');
