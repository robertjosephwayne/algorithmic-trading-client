import { format } from 'date-fns';

export function currencyFormatter(value: number | string): string {
    if (!value) return '';

    if (typeof value === 'string') {
        value = parseInt(value);
    }

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: 2,
    });
}

export function dateFormatter(value: any, showTime: boolean): string {
    if (!value) return '';

    let formattedDate = format(new Date(value), 'M/d/yyyy');
    if (showTime) {
        formattedDate = format(new Date(value), 'M/d/yyyy, pp');
    }

    return formattedDate;
}
