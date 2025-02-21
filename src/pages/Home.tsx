import { useState } from "react"
import ShowCard from "../components/ShowCard"
import { Show, ShowsContextType } from '../types/global'
import Filters from "../components/Filters"
import { useShowsContext } from "../context/ShowsContext"

const Home = () => {
    const { shows } = useShowsContext() as ShowsContextType
    
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All'])

    const filteredShows = shows.filter(show =>
        (selectedGenres.length === 0 || show.genres.some(genre => selectedGenres.includes(genre))) &&
        (selectedStatuses[0] === 'All' || show.status === selectedStatuses[0])
    )

    return (
        <>
            <Filters
                genres={{
                    selectedGenres,
                    setSelectedGenres
                }}
                statuses={{
                    selectedStatuses, setSelectedStatuses
                }}
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