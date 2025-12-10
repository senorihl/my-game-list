import {Outlet, NavLink, useLocation, useNavigate} from "react-router";
import 'beercss';

function NavButtons(props: { path: string }) {
    const navigate = useNavigate();

    if (props.path.match(/add-game\/\d+$/)) {
        return (
            <>
                <a onClick={() => {
                    navigate(-1)
                }}>
                    <i>arrow_back</i>
                    <div>Go back</div>
                </a>
                <button className="tertiary" onClick={() => {
                    navigate(`${props.path}/add`)
                }}>
                    <i>add</i>
                    <div>Add game</div>
                </button>
            </>
        )
    }

    if (props.path.match(/edit-game\/\d+$/)) {
        return (
            <>
                <a onClick={() => {
                    navigate(-1)
                }}>
                    <i>arrow_back</i>
                    <div>Go back</div>
                </a>
                <NavLink to={"/"}>
                    <i>home</i>
                    <div>Home</div>
                </NavLink>
                <NavLink to={'/search'}>
                    <i>search</i>
                    <div>Search</div>
                </NavLink>
            </>
        )
    }

    return (
        <>
            <NavLink to={"/"}>
                <i>home</i>
                <div>Home</div>
            </NavLink>
            <NavLink to={'/search'}>
                <i>search</i>
                <div>Search</div>
            </NavLink>
        </>
    )
}

export default function Layout(): React.ReactNode {
    const nav = useLocation();

    return <>
        <Outlet />
        <footer className="fixed" style={{background: 'transparent'}}>
            <nav className="center-align tiny-space padding">
                <nav className="toolbar elevate blur">
                    <NavButtons path={nav.pathname} />
                </nav>
            </nav>
        </footer>
    </>
}