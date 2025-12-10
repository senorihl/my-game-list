import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {AppDetails, Data} from "../AppDetails.ts";
import {uniq} from "lodash";


type GameState = 'TODO' | 'ACTIVE' | 'FINISHED';

type Game = {
    game: Data,
    state: GameState,
    customTags: string[],
}

const initialState: Game[] = [];

export const fetchGame = async (appid: number): Promise<AppDetails> => {
    const finalURl = new URL('https://us-central1-lobs-159411.cloudfunctions.net/cors-anywhere');
    finalURl.searchParams.set('u', `https://store.steampowered.com/api/appdetails?appids=${appid}`);
    return await fetch(finalURl.toString()).then(res => res.json()).then((res: {[appid: number]: AppDetails}) => res[appid]);
}

export const addGame = createAsyncThunk('addGame', async (game: number | AppDetails): Promise<Game> => {
    if (typeof game === 'number') {
        game = await fetchGame(game);
    }

    return {
        game: game.data,
        state: 'TODO',
        customTags: []
    }
})
export type ListState = typeof initialState;
export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        toggleState(state, action: PayloadAction<number>) {
            for (const i in state) {
                if (state[i].game.steam_appid === action.payload) {
                    switch (state[i].state) {
                        case 'TODO': {
                            state[i].state = 'ACTIVE';
                            break;
                        }
                        case 'ACTIVE': {
                            state[i].state = 'FINISHED';
                            break;
                        }
                        case 'FINISHED': {
                            state[i].state = 'TODO';
                            break;
                        }
                    }
                }
            }
        },
        addTags(state, action: PayloadAction<{ appid: number, tags: string[] }>) {
            for (const i in state) {
                if (state[i].game.steam_appid === action.payload.appid && action.payload.tags.length > 0) {
                    state[i].customTags = uniq([...state[i].customTags, ...action.payload.tags])
                }
            }
        },
        removeTag(state, action: PayloadAction<{ appid: number, tag: string }>) {
            for (const i in state) {
                if (state[i].game.steam_appid === action.payload.appid && action.payload.tag.length > 0) {
                    state[i].customTags = state[i].customTags.filter((t) => t !== action.payload.tag)
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addAsyncThunk(addGame, {
            fulfilled: (state, action) => {
                if (state.map(({game}) => game.steam_appid).indexOf(action.payload.game.steam_appid) === -1) {
                    state.push(action.payload)
                }
            },
        })
    }
})

export const { toggleState, addTags, removeTag } = listSlice.actions
export default listSlice.reducer;