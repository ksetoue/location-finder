import { output } from './mocks/mocks';
import PlacesServices from '../../src/services/PlacesService'; 

describe('Get location object using maps', () => {

    it('should rejects if the input is null', () => {
        return PlacesServices.searchPlaces('')
            .catch(e => {
                expect(e).toBeTruthy();
            });
    });

    it('should return expected data', () => {
        return PlacesServices.searchPlaces('Statue of Liberty')
            .then(location => {
                expect(location).toEqual(output);
            })
    });
});