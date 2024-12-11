export function isInStringEnum(value: string, enumeration: any): boolean {
    return Object.values(enumeration).includes(value);
}