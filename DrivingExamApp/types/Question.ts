export type Question = {
    guid: string,
    number: number,
    text: string,
    points: number,
    imageUrl?: string,
    moduleGuid: string,
    topicGuid: string,
    answers: {
        guid: string,
        text: string
    }[]
}

export function isQuestion(obj: any): obj is Question {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.guid === 'string' &&
        typeof obj.number === 'number' &&
        typeof obj.text === 'string' &&
        typeof obj.points === 'number' &&
        (typeof obj.imageUrl === 'string' || obj.imageUrl === undefined) &&
        typeof obj.moduleGuid === 'string' &&
        typeof obj.topicGuid === 'string' &&
        Array.isArray(obj.answers) &&
        obj.answers.every((answer: any) =>
            typeof answer.guid === 'string' &&
            typeof answer.text === 'string'
        )
    );
}