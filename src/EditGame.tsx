import {useParams} from "react-router";
import {useApp} from "./hooks/steam.tsx";
import {useAppSelector, useAppDispatch} from "./store/hooks.ts";
import {addTags, removeTag} from "./store/listSlice.ts";

export default function EditGame(): React.ReactNode {
    const {appid} = useParams<{appid: string}>();
    const dispatch = useAppDispatch();
    const {state, customTags} = useAppSelector(state => state.list.filter(({game}) => `${game.steam_appid}` === appid)[0])
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
                    <div className="padding">
                        <p>
                            {state === 'TODO' && <>To do</>}
                            {state === 'ACTIVE' && <>Currently playing</>}
                            {state === 'FINISHED' && <>Finished</>}
                        </p>
                    </div>
                </article>
                <p className="extra-line"><b>Categories</b>: {data.data.categories.map(({description, id}) => (
                    <button key={`cat_${id}`} disabled className="chip fill small">{description}</button>
                ))} </p>
                <p className="extra-line">
                    <b>Custom tags</b>:
                    {customTags.map((label) => (
                        <button key={`custom_cat_${label}`} className="chip fill small" onClick={() => {
                            dispatch(removeTag({ appid: Number.parseInt(appid as string), tag: label }));
                        }}>
                            <span>{label}</span>
                            <i className="fa-solid fa-close"></i>
                        </button>
                    ))}
                    <div className="field label small">
                        <input type="text" placeholder="" onKeyUp={(kEvent) => {
                            switch (kEvent.key) {
                                case 'Enter':
                                case ',':
                                {
                                    const {value} = (kEvent.target as HTMLInputElement)
                                    const tags = value.split(',').map(t => t.trim()).filter(t => t.length > 0);
                                    dispatch(addTags({ appid: Number.parseInt(appid as string), tags }));
                                    (kEvent.target as HTMLInputElement).value = '';
                                    break;
                                }

                            }
                        }} />
                        <label>Enter your custom tag here (separated by commas)</label>
                    </div>
                </p>
            </main>
        </>
    );
}