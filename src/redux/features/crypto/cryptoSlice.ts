import { createSlice } from '@reduxjs/toolkit';

import { cryptoSymbol } from 'crypto-symbol';
const { nameLookup } = cryptoSymbol({
    Celo: 'CGLD',
    Paxos: 'PAX',
});

const initialState = { bars: {} } as CryptoState;

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        addBar: (state, action) => {
            const bar = action.payload;

            if (!bar.pair.includes('-USD')) return;

            const displayName = nameLookup(bar.pair.replace('-USD', ''));

            if (!state.bars[bar.pair]) {
                state.bars[bar.pair] = {};
            }

            state.bars[bar.pair].price = bar.p;

            if (!state.bars[bar.pair].displayName) {
                state.bars[bar.pair].displayName = displayName;
            }
        },
    },
});

export interface CryptoState {
    bars: {
        [key: string]: {
            price?: number;
            displayName?: string;
        };
    };
}

export const { addBar } = cryptoSlice.actions;

export default cryptoSlice.reducer;
