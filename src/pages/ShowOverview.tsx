import { useParams } from "react-router-dom"
import { Show, ShowsContextType } from '../types/global'
import { useEffect, useState } from "react"
import { format } from 'date-fns'
import { useShowsContext } from "../context/ShowsContext"
import FavoriteShow from "../components/FavoriteShow"

const ShowOverview = () => {
    const { shows } = useShowsContext() as ShowsContextType
    
    const { id } = useParams()
    const [show, setShow] = useState<Show>()

    const getShow = async (): Promise<void> => {
        if (!id) return

        for (const item of shows) {
            if (item.id == parseInt(id)) {
                setShow(item)
            }
        }
    }

    useEffect(() => {
        getShow()
    }, [shows])


    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent || ""
    }

    const formattedDate = (date: string) => {
        return date 
        ? format(new Date(date), 'EEE MMM dd yyyy')
        : 'No date available'
    }

    return (
        <div>
            { show && 
            <div className="show-container"> 
                <img src={show.image.original} alt={show.name} />

                <div className="show-details">
                    <div>
                        <p className="show-name">{show.name}</p>
                        <FavoriteShow showId={show.id} 
                        buttonStyle={<p className="add-favorite">Add to favorites</p>} 
                        buttonStyleActive={<p className="add-favorite is-favorite">Favorite</p>}/>
                        <p> {stripHtml(show.summary)}</p>
                    </div>

                    <div className="show-info">
                        <p>Premiered: {formattedDate(show.premiered)}</p>
                        <p>Ended: {formattedDate(show.ended)}</p>
                        <p>Average runtime {show.averageRuntime} minutes</p>
                        <p>Show status: {show.status}</p>
                        <p>Language: {show.language}</p>
                        <p>Average rating: {show.rating.average}</p>
                        <p> Official site:&nbsp;
                        <a href={show.officialSite}target="_blank" rel="noopener noreferrer" className="link">Go to official site</a>
                        </p>
                        <p>Genres: {show.genres.join(', ')}</p>
                    </div>
                </div> 
            </div> }
        </div>
    );
}

export default ShowOverview;