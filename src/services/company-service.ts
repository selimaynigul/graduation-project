import { apiClient } from "config";

const companyService = {
  search: (params = {}) => apiClient.post("/company/search", params),

  add: (params = {}) => apiClient.post("/company", params),

  update: (params = {}) => apiClient.put("/company", params),

  delete: (id: any) => apiClient.delete(`/company/${id}`),

  getByPagination: (params = {}) =>
    apiClient.post("/company/getByPagination", params),
};

export default companyService;
