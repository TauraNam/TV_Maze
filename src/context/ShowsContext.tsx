import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Show, ShowsContextType } from '../types/global'

interface ShowsProviderProps {
    children: ReactNode
}

const ShowsContext = createContext<ShowsContextType | undefined>(undefined)

export const ShowsProvider = ({ children }: ShowsProviderProps) => {
    const [shows, setShows] = useState<Show[]>([])

    const getShows = async (): Promise<void> => {
        try {
            const response = await fetch('https://api.tvmaze.com/shows')

            if (!response.ok) {
                throw new Error('Network response error.')
            }

            const data: Show[] = await response.json()

            setShows(data)
        } catch (err) {
            console.error('Error during fetch:', err)
        }
    }

    useEffect(() => {
        getShows()
    }, [])

    return (
        <ShowsContext.Provider value={{ shows }}>
            {children}
        </ShowsContext.Provider>
    );
}

export const useShowsContext = () => useContext(ShowsContext);