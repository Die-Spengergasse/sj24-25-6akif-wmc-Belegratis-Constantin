export type Module = {
    number: number;
    name: string;
    guid: string;
};

export function isModule(obj: any): obj is Module {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.number === 'number' &&
        typeof obj.name === 'string' &&
        typeof obj.guid === 'string'
    );
}