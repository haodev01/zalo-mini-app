import http from "libs/http";

const productApi = {
  getAll: async () => {
    const response = await http.get("/pokemon");
    console.log(response);
    return response;
  },
};
export default productApi;
