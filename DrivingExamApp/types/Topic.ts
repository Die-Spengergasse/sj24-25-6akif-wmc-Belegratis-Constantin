export type Topic = {
    guid: string,
    name: string,
    questionCount: number
}

export function isTopic(obj: any): obj is Topic {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.guid === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.questionCount === 'number'
    );
}