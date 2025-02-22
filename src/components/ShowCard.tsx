import { Show } from '../types/global'
import { MdOutlineFavoriteBorder } from "react-icons/md"
import FavoriteShow from './FavoriteShow'
import { FC } from 'react'


interface ShowCardProps {
    show: Show
}

const ShowCard: FC<ShowCardProps> = ({ show }) => {

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent || ""
    }

    return (
        <div className='show-card'>
            <a href={`/${show.id}`}>
                <img src={show.image.medium} alt={show.name} />
            </a>
            <div className='card-details'>
                <div className='card-header'>
                    <a href={`/${show.id}`}>
                        <p>{show.name}</p>
                    </a>
                    <FavoriteShow showId={show.id} buttonStyle={<MdOutlineFavoriteBorder className='heart-icon'/>} buttonStyleActive={<MdOutlineFavoriteBorder className='is-favorite heart-icon' />} />
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