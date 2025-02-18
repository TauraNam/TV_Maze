import { useState } from "react";
import ShowCard from "../components/ShowCard";

interface Show {
    id: number,
    name: string,
    image: {
        medium: string,
        original: string
    },
    summary: string,
    genres: Array<string>
}

const Home = () => {
    const [shows, setShows] = useState<Show[]>([])

    const getShows = async (): Promise<void> => {
        try {
            const response = await fetch('https://api.tvmaze.com/shows');

            if (!response.ok) {
                throw new Error('Network response error.');
            }

            const data: Show[] = await response.json();

            setShows(data);
        } catch (err) {
            console.error('Error during fetch:', err);
        }
    };

    getShows()

    return (
        <>
            {shows.map((show: Show) => {
                return <ShowCard key={show.id} show={show} />
            })}
        </>
    );
}

export default Home;