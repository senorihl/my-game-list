import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit'
import listReducer, {listSlice, type ListState} from './listSlice';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    predicate: () => true,
    effect(_action, api) {
        localStorage.setItem('store', JSON.stringify(api.getState()));
    }
})

export const store = configureStore({
    reducer: {
        [listSlice.name]: listReducer
    },
    devTools: true,
    preloadedState: ((value) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value) as {[listSlice.name]: ListState};
            } catch {
                return void 0;
            }
        }

        return void 0;
    })(localStorage.getItem('store')),
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware);
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;