import { useState, useEffect, JSX } from 'react'

interface FavoriteShowProps {
    showId: number,
    buttonStyle: JSX.Element,
    buttonStyleActive: JSX.Element
}

const FavoriteShow: React.FC<FavoriteShowProps> = ({ showId, buttonStyle, buttonStyleActive }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(showId))
    }, [])

    const toggleFavorite = () => {
        const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

        if (favorites.includes(showId)) {
            setIsFavorite(false)
            localStorage.setItem('favorites', JSON.stringify(favorites.filter((id: number) => id !== showId)))
        } else {
            setIsFavorite(true)
            favorites.push(showId)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }

    return (
        <span onClick={toggleFavorite} id="favorites-span">
            {isFavorite ? (
                buttonStyleActive 
            ) : (
                buttonStyle
            )}
        </span>
    );
}

export default FavoriteShow;