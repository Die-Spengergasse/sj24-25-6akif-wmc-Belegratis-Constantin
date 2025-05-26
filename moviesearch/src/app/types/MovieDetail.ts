export interface MovieDetail {
    Title: string,
    Year: number,
    Plot: string,
    Ratings: Array<{ Source: string, Value: string }>
}