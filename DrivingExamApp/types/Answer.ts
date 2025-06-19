export type Answer = {
    pointsReachable: number;
    pointsReached: number;
    checkResult: Record<string, boolean>;
};

export function isAnswer(obj: any): obj is Answer {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.pointsReachable === "number" &&
        typeof obj.pointsReached === "number" &&
        typeof obj.checkResult === "object" &&
        obj.checkResult !== null &&
        Object.values(obj.checkResult).every(value => typeof value === "boolean")
    );
}
