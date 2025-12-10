import type {AppDetails} from "../AppDetails.ts";
import {useLayoutEffect, useState} from "react";
import {fetchGame} from "../store/listSlice.ts";

export function useApp<T = [data: null|AppDetails, loading: boolean]>(appid: string): T {
    const [value, setValue] = useState<{data: AppDetails|null, loading: boolean}>({data: null, loading: true});

    useLayoutEffect(() => {
        setValue((prevState) => {
            return {...prevState, loading: true};
        });

        fetchGame(Number.parseInt(appid))
            .then(data => {
                setValue(prevState => ({...prevState, data: data}));
            })
            .finally(() => {
                setValue(prevState => ({...prevState, loading: false}));
            })
    }, [])

    return [value.data, value.loading] as T;
}