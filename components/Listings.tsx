import ListingItem from '../components/ListingItem';

export default function Listings({ data }) {
    return data.map((listing) => (
        <ListingItem key={listing.id} data={listing} />
    ));
}
