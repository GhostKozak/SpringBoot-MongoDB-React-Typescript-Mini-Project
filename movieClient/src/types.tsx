export interface Movie {
    id: Id
    imdbId: string
    title: string
    releaseDate: string
    trailerLink: string
    poster: string
    genres: string[]
    backdrops: string[]
    reviewIds: ReviewId[]
}

export interface Id {
    timestamp: number
    date: string
}

export interface ReviewId {
    id: Id2
    body: string
}

export interface Id2 {
    timestamp: number
    date: string
}
