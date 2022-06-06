import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const url = '/api/cryptocurrency/listings/latest';
        axios.get(url).then((response) => {
            setListings(response.data.data);
        });
    }, []);

    return listings.map((listing) => <div key={listing.id}>{listing.id}</div>);
}
