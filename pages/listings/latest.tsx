import axios from 'axios';
import { useEffect, useState } from 'react';
import Listings from '../../components/Listings';

export default function LatestPage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const url = '/api/cryptocurrency/listings/latest';
        axios.get(url).then((response) => {
            setListings(response.data.data);
        });
    }, []);

    return <Listings data={listings} />;
}
