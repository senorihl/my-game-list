import {type ChangeEvent, useCallback, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {toggleState} from "./store/listSlice.ts";
import uniq from "lodash/uniq";

export default function Home(): React.ReactNode {
    const list = useAppSelector(state => state.list)
    if (list.length === 0) return <EmptyList />
    return <GameList />
}

function EmptyList(): React.ReactNode {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>();
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }, [])
    const onSearch = useCallback(() => {
        navigate({pathname: '/search', search: `?q=${query}`})
    }, [query]);

    return (
        <main className="responsive medium no-padding">
            <article className="padding absolute m l center middle medium middle-align center-align">
                <div>
                    <i className="extra">gamepad</i>
                    <h5>Your list feels a little empty</h5>
                    <p>Start searching a game</p>
                    <div className="space"></div>
                    <nav className="no-space">
                        <div className="max field border left-round">
                            <input value={query} onChange={onChange}/>
                        </div>
                        <button className="large right-round" onClick={onSearch}>Search</button>
                    </nav>
                </div>
            </article>
            <div className="middle-align center middle center-align padding">
                <div>
                    <i className="extra">gamepad</i>
                    <h5>Your list feels a little empty</h5>
                    <p>Start searching a game</p>
                    <div className="space"></div>
                    <nav className="no-space">
                        <div className="max field border left-round">
                            <input value={query} onChange={onChange}/>
                        </div>
                        <button className="large right-round" onClick={onSearch}>Search</button>
                    </nav>
                </div>
            </div>
        </main>
    )
}

function GameList(): React.ReactNode {
    const list = useAppSelector(state => state.list)
    const tags = useAppSelector(state => state.list.reduce((acc, curr) => {
        return uniq([...acc, ...curr.customTags, ...curr.game.categories.map(c => c.description)])
    }, [] as string[]))
    const [filters, setFilters] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const onToggle = useCallback((appid: number) => {
        dispatch(toggleState(appid))
    }, []);
    return (
        <>
            <header className="">
                <nav>
                    <h5 className="max center-align">Your list</h5>
                </nav>
            </header>
            <main className="responsive medium padding">
                <div className={"max no-padding"}>
                    <button className="small tiny-margin">
                        <span>Filter</span>
                        <i className="fa-solid fa-filter small"></i>
                        <menu className="no-wrap">
                            {tags.map(tag =>
                                <li onClick={() => {
                                    if (filters.includes(tag)) {
                                        setFilters(filters => uniq([...filters, tag]).filter(f => f !== tag))
                                    } else {
                                        setFilters(filters => uniq([...filters, tag]))
                                    }
                                }}>
                                    {filters.includes(tag) && <i className={"fa-solid fa-check"}></i>}
                                    <span className={"max"}>{tag}</span>
                                </li>
                            )}
                        </menu>
                    </button>
                    {filters.length > 0 ? filters.map((label) => (
                        <button key={`filter_cat_${label}`} className="chip fill small tiny-margin" onClick={() => {
                            setFilters(filters => uniq(filters.filter(f => f !== label)))
                        }}>
                            <span>{label}</span>
                            <i className="fa-solid fa-close"></i>
                        </button>
                    )) : <span>Filter games by tags</span>}
                </div>

                {['TODO', 'ACTIVE', 'FINISHED'].map((stateFilter) => {
                    const filtered = list
                        .filter(({state}) => state === stateFilter)
                        .filter(({customTags, game: {categories}}) => {
                            if (filters.length === 0) return true;
                            return customTags.some(t => filters.indexOf(t) >= 0) || categories.map(c => c.description).some(c => filters.indexOf(c) >= 0);
                        });
                    let label, color: string;
                    switch (stateFilter) {
                        case 'ACTIVE': {
                            label = 'Currently playing';
                            color = 'blue';
                            break;
                        }
                        case 'FINISHED': {
                            label = 'Finished';
                            color = 'green';
                            break;
                        }
                        case 'TODO': {
                            label = 'To do';
                            color = 'lime';
                            break;
                        }
                    }
                    if (filtered.length)
                        return (
                            <>
                                <h6>{label}</h6>
                                <ul key={`game[${stateFilter}]`} className="list border">
                                    {filtered.map(({game}) => {
                                        return (
                                            <li key={`game[${stateFilter}][${game.steam_appid}]`}
                                                className="no-padding">
                                                <div className="">
                                                    <button className={`circle ${color}`} onClick={() => {
                                                        onToggle(game.steam_appid)
                                                    }}>
                                                        {stateFilter === 'TODO' &&
                                                            <i className="fa-solid fa-hourglass"></i>}
                                                        {stateFilter === 'ACTIVE' &&
                                                            <i className="fa-solid fa-play"></i>}
                                                        {stateFilter === 'FINISHED' &&
                                                            <i className="fa-solid fa-check"></i>}
                                                    </button>
                                                </div>
                                                <Link to={`/edit-game/${game.steam_appid}`}
                                                      className="transparent square max"
                                                      style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <div className="max">
                                                        <h6 className="small">{game.name}</h6>
                                                        <div>{game.developers.map(dev => dev)}</div>
                                                    </div>
                                                    <i>chevron_right</i>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        )
                })}
            </main>
        </>
    )
}