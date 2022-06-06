import axios from 'axios';
import { useEffect, useState } from 'react';
import Category from '../../../components/Category';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const url = '/api/cryptocurrency/categories';
        axios.get(url).then((response) => {
            setCategories(response.data.data);
        });
    }, []);

    return categories.map((category) => (
        <Category key={category.id} data={category} />
    ));
}
