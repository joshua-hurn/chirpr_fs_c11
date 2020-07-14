import React, { useState, useEffect } from 'react';
import Compose from "../components/Compose";

const Home: React.FC<IHomeProps> = () => {
    const [chirps, setChirps] = useState<IChirps[]>([]);

    useEffect(() => {
        (async () => {
            let res = await fetch("/api/chirps/");
            let data = await res.json();
            setChirps(data);
        })();
    }, []);

    return (
        <main className="container my-5">
            <div className="row ">
                <Compose />
            </div>
            <div className="row">
                {chirps.map(chirp => (
                    <div key={chirp.id} className="card m-3 bg-light">
                        <div className="card-body">
                            <h5 className="card-title">{chirp.name}</h5>
                            <p className="card-text">{chirp.content}</p>
                            <a href="#" className="card-link">edit</a>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

interface IHomeProps {}

interface IChirps {
    id: number;
    userid: number;
    name: string;
    content: string;
    created_at: string;
}

export default Home