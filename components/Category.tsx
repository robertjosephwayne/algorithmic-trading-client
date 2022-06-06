export default function Category({ data }) {
    return (
        <div>
            {data.name} {data.title}: {data.description}
        </div>
    );
}
