import { useEffect, useState } from "react"
import ShowCard from "../components/ShowCard"
import { Show } from '../types/global'
import Filters from "../components/Filters"

const Home = () => {
    const [shows, setShows] = useState<Show[]>([])
    const [genresList] = useState<Set<string>>(new Set())
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [statusesList] = useState<Set<string>>(new Set())
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

    const getShows = async (): Promise<void> => {
        try {
            const response = await fetch('https://api.tvmaze.com/shows')

            if (!response.ok) {
                throw new Error('Network response error.')
            }

            const data: Show[] = await response.json()

            setShows(data)
            getGenres(data)
            getStatus(data)
        } catch (err) {
            console.error('Error during fetch:', err)
        }
    }

    useEffect(() => {
        getShows()
    }, [])

    const filteredShows = shows.filter(show =>
        (selectedGenres.length === 0 || show.genres.some(genre => selectedGenres.includes(genre))) &&
        (selectedStatuses[0] === 'All' || show.status === selectedStatuses[0])
    )

    const getGenres = (data: Show[]): void => {
        for (const show of data) {
            for (const genre of show.genres) {
                genresList.add(genre)
            }
        }
    }

    const getStatus = (data: Show[]): void => {
        statusesList.add('All')
        for (const show of data) {
            statusesList.add(show.status)
        }
    }

    return (
        <>
            <Filters
                genres={{
                    genresList,
                    selectedGenres, setSelectedGenres
                }}
                statuses={{ statusesList, selectedStatuses, setSelectedStatuses }}
            />
            <div className="shows-container">
                {filteredShows.map((show: Show) => {
                    return <ShowCard key={show.id} show={show} />
                })}
            </div>
        </>
    );
}

export default Home;