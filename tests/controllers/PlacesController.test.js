import "@babel/polyfill";
import PlacesController from '../../src/controllers/PlacesController'; 
import { arrayWith4Items, arrayWithMoreThan100 } from '../__mocks__/mocks'
import { mockResponse, mockRequest } from '../__mocks__/request';

describe('Get response from locations', () => {
    it('should return status code 413 if the input has more than 100 items', async () => {
        const req = mockRequest(arrayWithMoreThan100);
        const res = mockResponse(); 
        await PlacesController.getLocations(req, res);
        expect(res.status).toHaveBeenCalledWith(413);
        expect(res.json).toHaveBeenCalledWith('Payload must contain less than 100 items.');
    });

    it('should return a status code 400 the input has more than 50 items', async () => {
        const req = mockRequest(arrayWith4Items);
        const res = mockResponse(); 
        await PlacesController.getLocations(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Payload must contain more than 50 items.');
    });
});