import { format } from 'date-fns';

export function currencyFormatter(value: any): string {
    if (!value) return '';

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: 0,
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
