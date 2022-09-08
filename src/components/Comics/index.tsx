import axios from 'axios';
import md5 from 'md5';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
const publickKey = '58dc25a900c010b4f3a24cf0a3a326ce';

const privateKey = '890071ddd47c7524d0f47d2c0bc5ff473a3537dc';

const time = Number(new Date());

const hash = md5(time + privateKey + publickKey);

interface ResponseData {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

export function Comics() {
    const [comics, setComics] = useState<ResponseData[]>([]);
    useEffect(() => {
        axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${time}&apikey=${publickKey}&hash=${hash}`)
            .then(response => setComics(response.data.data.results))
            .catch(err => console.log(err));
    }, []);
    return (
        <main className={styles.contentContainer}>
            <h1>Comics</h1>
            <section>
                <div className={styles.listComics}>
                    <ul>
                        {comics.map(comic => {
                            return (
                                <li key={comic.id}>
                                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title}></img>
                                    <span>{comic.title}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </main>

    )
}