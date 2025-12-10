import {useParams, Navigate} from "react-router";
import {useEffect, useState} from "react";
import capitalize from "lodash/capitalize";
import {addGame} from "./store/listSlice.ts";
import {useAppDispatch} from "./store/hooks.ts";
import {useApp} from "./hooks/steam.tsx";

export default function AddGame(): React.ReactNode {
    const {appid} = useParams<{appid: string}>();
    const [data, loading] = useApp(appid as string);

    if (loading) {
        return (
            <main className="responsive medium middle-align center-align">
                <progress className="circle large"></progress>
            </main>
        );
    } else if (!data) {
        return (
            <main className="responsive medium middle-align center-align">
                <p>Failed to fetch data</p>
            </main>
        );
    }

    return (
        <>
            <header className="">
                <nav>
                    <h5 className="max center-align">{data.data.name}</h5>
                </nav>
            </header>
            <main className="responsive medium padding" style={{maxWidth: 450}}>
                <article className="no-padding">
                    <img className="responsive medium" src={data.data.header_image}/>
                </article>
                <div className="padding">
                    <p>{data.data.short_description}</p>
                    <p><b>Published by</b>: {data.data.publishers} </p>
                    <p><b>Developed by</b>: {data.data.developers} </p>
                    <p className="extra-line">
                        <b>Platforms</b>: {Object.entries(data.data.platforms).map(([name, valid]) => valid ? (
                        <button key={`platform_${name}`} disabled className="chip fill small">{capitalize(name)}</button>
                    ) : (<></>))} </p>
                    <p className="extra-line"><b>Categories</b>: {data.data.categories.map(({description, id}) => (
                        <button key={`cat_${id}`} disabled className="chip fill small">{description}</button>
                    ))} </p>
                </div>
                {data.data.movies?.[0] && (data.data.movies[0].webm?.["480"] || data.data.movies[0].mp4?.["480"]) && (
                    <article className="no-padding">
                        <video className="responsive large" autoPlay={true} muted={true} controls
                               poster={data.data.movies[0].thumbnail} onError={(e) => e.currentTarget.remove()}>
                            {data.data.movies[0].webm?.["480"] && <source src={data.data.movies[0].webm["480"]} type="video/webm"/>}
                            {data.data.movies[0].mp4?.["480"] && <source src={data.data.movies[0].mp4["480"]} type="video/mp4"/>}
                        </video>
                    </article>
                )}
            </main>
        </>
    );
}

export function SaveGame(): React.ReactNode {
    const {appid} = useParams() as { appid: string };
    const [data, loading] = useApp(appid as string);
    const [saved, setSaved] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!loading && data) {
            dispatch(addGame(data))
                .then(() => {
                    setSaved(true)
                })
        }
    }, [data, loading])

    if (loading) {
        return (
            <main className="responsive medium middle-align center-align">
                <progress className="circle large"></progress>
            </main>
        );
    } else if (!data) {
        return (
            <main className="responsive medium middle-align center-align">
                <p>Failed to fetch data</p>
            </main>
        );
    } else if (!saved) {
        return (
            <main className="responsive medium middle-align center-align">
                <progress className="circle large"></progress>
            </main>
        );
    }

    return  <Navigate to={"/"} />
}