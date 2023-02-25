import { format } from 'date-fns';

export function currencyFormatter(value: number | string, maximumFractionDigits = 2): string {
    if (!value) return '';

    if (typeof value === 'string') {
        value = parseInt(value);
    }

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: maximumFractionDigits,
    });
}

export function dateFormatter(value: any, showTime: boolean): string {
    if (!value || value === 'auto') return '';

    let formattedDate = format(new Date(value), 'M/d/yyyy');
    if (showTime) {
        formattedDate = format(new Date(value), 'M/d/yyyy, pp');
    }
    return formattedDate;
}

export function toProperCase(text: string): string {
    text = text.toLowerCase();
    const characters = text.split('');
    characters[0] = characters[0].toUpperCase();
    return characters.join('');
}
