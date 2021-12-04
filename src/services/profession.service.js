import httpService from "./http.service";

const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const req = await httpService.get(professionEndPoint);
        return req.data;
    }
};

export default professionService;
