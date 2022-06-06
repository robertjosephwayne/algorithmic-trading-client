export default function ListingItem({ data }) {
    return (
        <div key={data.id}>
            {data.symbol} {data.name} {data.quote.USD.price}
        </div>
    );
}
