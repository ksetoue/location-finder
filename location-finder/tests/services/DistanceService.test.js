import DistanceServices from '../../src/services/DistanceService';

describe('Sending an empty input to calculate distance', () => {
    it('should return an empty array', () => {
        const expected = [];
        let result = DistanceServices.getDistances([]);
        expect(result).toEqual(expected);
    });
});

