import { useEffect, useState } from "react"
import ShowCard from "../components/ShowCard"
import { Show, ShowsContextType } from '../types/global'
import Filters from "../components/Filters"
import { useShowsContext } from "../context/ShowsContext"
import Pagination from "../components/Pagination"

const Home = () => {
    const { shows } = useShowsContext() as ShowsContextType
    const [sortedShows, setSortedShows] = useState<Show[]>(shows)

    const [selectedSorting, setSelectedSorting] = useState<string>('')
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All'])

    const [currentPage, setCurrentPage] = useState<number>(1)
    const showsPerPage: number = 8

    const changeSorting = (): void => {
        let sorted = [...shows]

        if (selectedSorting === "name-asc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name))
        } else if (selectedSorting === "name-dsc") {
            sorted.sort((a, b) => b.name.localeCompare(a.name))
        } else if (selectedSorting === "premiered-asc") {
            sorted.sort((a, b) => (a.premiered > b.premiered ? 1 : -1))
        } else if (selectedSorting === "premiered-dsc") {
            sorted.sort((a, b) => (a.premiered < b.premiered ? 1 : -1))
        }
        setSortedShows(sorted)
    }

    useEffect(() => {
        changeSorting()
        setCurrentPage(1)
    }, [selectedSorting, shows])

    const filteredShows = sortedShows.filter(show =>
        (selectedGenres.length === 0 || show.genres.some(genre => selectedGenres.includes(genre))) &&
        (selectedStatuses[0] === 'All' || show.status === selectedStatuses[0])
    )

    const indexOfLastShow = currentPage * showsPerPage
    const indexOfFirstShow = indexOfLastShow - showsPerPage
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow)

    const totalPages = Math.ceil(filteredShows.length / showsPerPage)


    return (
        <>
            <Filters
                setSelectedSorting={setSelectedSorting}
                genres={{
                    selectedGenres,
                    setSelectedGenres
                }}
                statuses={{
                    selectedStatuses, setSelectedStatuses
                }}
            />
            <div className="shows-container">
                {currentShows.map((show: Show) => {
                    return <ShowCard key={show.id} show={show} />
                })}
            </div>
            <div className="pagination-container">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}  />
            </div>
        </>
    );
}

export default Home;