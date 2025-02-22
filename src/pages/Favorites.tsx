import ShowCard from "../components/ShowCard"
import { useShowsContext } from "../context/ShowsContext"
import { Show, ShowsContextType } from "../types/global"

const Favorites = () => {
    const { shows } = useShowsContext() as ShowsContextType

    const favorites:Array<number> = JSON.parse(localStorage.getItem('favorites') || '[]')

    const filteredShows = shows.filter(show =>
        favorites.includes(show.id)
    )
    
    return ( 
        <div className="shows-container">
        {filteredShows.length !== 0 ? filteredShows.map((show: Show) => {
            return <ShowCard key={show.id} show={show} />
        }) : <p>No Favorite Shows Found</p>}
    </div>
     );
}
 
export default Favorites;