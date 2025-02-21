export interface Show {
    id: number,
    name: string,
    image: {
        medium: string,
        original: string
    },
    summary: string,
    rating: {
        average: number
    }
    genres: Array<string>,
    status: string,
    premiered: string,
    ended: string,
    averageRuntime: number,
    language: string,
    officialSite: string
}

export interface ShowsContextType {
    shows: Show[]
}

