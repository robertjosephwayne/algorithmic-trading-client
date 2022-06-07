import axios from 'axios';
import { useEffect, useState } from 'react';
import IncomeStatement from '../../../components/IncomeStatement';

export default function IncomeStatementPage() {
    const [symbol, setSymbol] = useState('IBM');
    const [annualReports, setAnnualReports] = useState([]);
    const [quarterlyReports, setQuarterlyReports] = useState([]);

    useEffect(() => {
        const url = `/api/fundamentals/income-statement/${symbol}`;
        axios.get(url).then((response) => {
            const { data } = response;
            setAnnualReports(data.annualReports);
            setQuarterlyReports(data.quarterlyReports);
        });
    }, []);

    return <IncomeStatement key={symbol} reports={annualReports} />;
}
