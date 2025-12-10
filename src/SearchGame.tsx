import {Link, useSearchParams} from "react-router";
import {type ChangeEvent, createRef, Suspense, use, useEffect, useLayoutEffect, useState} from "react";
import {useDebounceCallback} from "usehooks-ts";
import type {SearchSuggestionsResult} from "./SearchSuggestionResult.ts";

const PAGE_LENGTH = 20;

const buildQuery = (search_term: string, start: number = 0) => {
    const url = new URL('https://api.steampowered.com/IStoreQueryService/SearchSuggestions/v1/');

    url.searchParams.set('input_json', JSON.stringify({
        search_term,
        start,
        max_results: PAGE_LENGTH,
        context: {
            language: "english",
            country_code: "US",
            steam_realm: "1"
        },
        filters: {
            type_filters: {
                include_games: true,
            }
        },
        data_request: {
            include_basic_info: true,
            include_assets: true,
            include_screenshots: true,
        }
    }));

    const finalURl = new URL('https://us-central1-lobs-159411.cloudfunctions.net/cors-anywhere');
    finalURl.searchParams.set('u', url.toString());

    return finalURl.toString();
}

export default function SearchGame(): React.ReactNode {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') || void 0;
    const input = createRef<HTMLInputElement>();
    const [fetchQuery, setFetchQuery] = useState<Promise<any>>();
    const [terms, setTerms] = useState<string>();

    const onChange = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setTerms(e.target.value);
        }
    }, 500);

    useEffect(() => {
        terms && setSearchParams((prev) => {
            prev.set('q', terms);
            return prev;
        });

        terms && setFetchQuery(
            new Promise((resolve) => {
                return fetch(buildQuery(terms)).then(res => res.json()).then(resolve)
            })
        )
    }, [terms])

    useLayoutEffect(() => {
        q && setTerms(q);
    }, [searchParams]);

    return(
        <>
            <header className="">
                <nav>
                    <h5 className="max center-align">Search</h5>
                </nav>
            </header>
            <main className="responsive medium padding">
                    <div className="field suffix round extra fill">
                        <input ref={input} type="text" autoFocus onChange={onChange} defaultValue={q}/>

                        <i>search</i>
                    </div>
                    {terms && fetchQuery && <Suspense fallback={<Searching />}>
                        <ul className="list border">
                            <ResultList fetch={fetchQuery} terms={terms} start={0}/>
                        </ul>
                    </Suspense>}
            </main>
        </>
    )
}

function Searching(): React.ReactNode {
    return <>
        <progress className="circle large"></progress>
    </>
}

function ResultList(props: { fetch: Promise<SearchSuggestionsResult>, terms: string, start: number }): React.ReactNode {
    const result = use(props.fetch);

    if (result.response.store_items) {
        return <>
            {result.response.store_items.map((item) => (
                <li>
                    <Link to={`/add-game/${item.appid}`} prefetch={"viewport"}>
                        <img className="round extra" style={{blockSize: 'initial'}} src={`https://shared.akamai.steamstatic.com/store_item_assets/${item.assets.asset_url_format.replace('${FILENAME}', item.assets.hero_capsule || item.assets.main_capsule)}`}/>
                        <div className="max">
                            <h6 className="small">{item.name}</h6>
                            <div>{item.basic_info.developers.map(dev => dev.name)}</div>
                        </div>
                    </Link>
                </li>
            ))}
        </>

    }

    return  <></>

}