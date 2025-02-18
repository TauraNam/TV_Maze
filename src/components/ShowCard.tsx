import { Show } from '../types/global'
import { MdOutlineFavoriteBorder } from "react-icons/md"


interface ShowCardProps {
    show: Show
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {

    const stripHtml = (html: string) => { 
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent || ""
    }

    return (
        <div className='show-card'>
            <img src={show.image.medium} alt={show.name} />
            <div className='card-details'>
                <div className='card-header'>
                    <p>{show.name}</p>
                    <MdOutlineFavoriteBorder />
                </div>
                <p className='summary'>
                    {stripHtml(show.summary)
                        .split(" ")
                        .slice(0, 15)
                        .join(" ") + "..." || ""
                    }
                </p>
                <div className='card-footer'>
                    <p className='rating'>
                        <span>Rating</span>
                        <span>{show.rating.average} / 10 </span>
                    </p>
                    <p className='genres'>{show.genres.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}

export default ShowCard;