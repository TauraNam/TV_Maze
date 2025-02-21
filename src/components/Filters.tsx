import { useEffect, useState } from "react"
import FilterModal from "./FilterModal"
import { useShowsContext } from "../context/ShowsContext"
import { ShowsContextType } from "../types/global"

interface FiltersProps {
    genres: {
        selectedGenres: string[]
        setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>
    }
    statuses: {
        selectedStatuses: string[]
        setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>
    }
}

const Filters: React.FC<FiltersProps> = ({ genres, statuses }) => {
    const { shows } = useShowsContext() as ShowsContextType
    
    const [genresList] = useState<Set<string>>(new Set())
    const [statusesList] = useState<Set<string>>(new Set())

    const [genresOpen, setGenresOpen] = useState<boolean>(false)
    const [statusOpen, setStatusOpen] = useState<boolean>(false)

    const getGenres = (): void => {
        for (const show of shows) {
            for (const genre of show.genres) {
                genresList.add(genre)
            }
        }
    }

    const getStatus = (): void => {
        statusesList.add('All')
        for (const show of shows) {
            statusesList.add(show.status)
        }
    }

    useEffect(() => {
        getGenres()
        getStatus()
    }, [shows])


    const toggleGenresModal = () => {
        setGenresOpen(!genresOpen)
        setStatusOpen(false)
    }

    const toggleStatusModal = () => {
        setStatusOpen(!statusOpen)
        setGenresOpen(false)
    }

    return (
        <div className="filters-container">
            <select className="sort-filter" defaultValue={""}>
                <option value="">No sort</option>
                <option value="name-asc">Name ascending</option>
                <option value="name-dsc">Name descending</option>
                <option value="premiered-asc">Premiered ascending</option>
                <option value="premiered-dsc">Premiered descending</option>
            </select>

            <button type="button" onClick={toggleGenresModal} className="genres-filter">Genres filter</button>
            {genresOpen &&
                <FilterModal data={genresList} selectStyle="checkbox" styleType="genres" selectedValues={genres.selectedGenres} setSelectedValues={genres.setSelectedGenres} />}

            <button type="button" onClick={toggleStatusModal} className="status-filter">Status filter</button>
            {statusOpen &&
                <FilterModal data={statusesList} selectStyle="radio" styleType="status" selectedValues={statuses.selectedStatuses} setSelectedValues={statuses.setSelectedStatuses} />}

        </div>
    );
}

export default Filters;