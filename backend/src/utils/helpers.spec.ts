import { isInStringEnum } from './helpers';

enum TestEnum {
    FIRST = 'first',
    SECOND = 'second',
    THIRD = 'third'
}

describe('isInStringEnum', () => {
    it('should return true if the value is in the enum', () => {
        expect(isInStringEnum('first', TestEnum)).toBe(true);
        expect(isInStringEnum('second', TestEnum)).toBe(true);
        expect(isInStringEnum('third', TestEnum)).toBe(true);
    });

    it('should return false if the value is not in the enum', () => {
        expect(isInStringEnum('fourth', TestEnum)).toBe(false);
        expect(isInStringEnum('fifth', TestEnum)).toBe(false);
    });

    it('should return false if the value is an empty string', () => {
        expect(isInStringEnum('', TestEnum)).toBe(false);
    });

    it('should return false if the value is null or undefined', () => {
        expect(isInStringEnum(null as any, TestEnum)).toBe(false);
        expect(isInStringEnum(undefined as any, TestEnum)).toBe(false);
    });
});