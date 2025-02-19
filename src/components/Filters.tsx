import { useState } from "react"
import FilterModal from "./FilterModal"

interface FiltersProps {
    genres: {
        genresList: Set<string>
        selectedGenres: string[]
        setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>
    }
    statuses: {
        statusesList: Set<string>
        selectedStatuses: string[]
        setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>
    }
}

const Filters: React.FC<FiltersProps> = ({ genres, statuses }) => {

    const [genresOpen, setGenresOpen] = useState<boolean>(false)
    const [statusOpen, setStatusOpen] = useState<boolean>(false)


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
                <FilterModal data={genres.genresList} selectStyle="checkbox" styleType="genres" selectedValues={genres.selectedGenres} setSelectedValues={genres.setSelectedGenres} />}

            <button type="button" onClick={toggleStatusModal} className="status-filter">Status filter</button>
            {statusOpen &&
                <FilterModal data={statuses.statusesList} selectStyle="radio" styleType="status" selectedValues={statuses.selectedStatuses} setSelectedValues={statuses.setSelectedStatuses} />}

        </div>
    );
}

export default Filters;