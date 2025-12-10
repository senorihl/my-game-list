import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Provider} from "react-redux";

import {store} from './store';
import Layout from "./Layout.tsx";
import Home from "./Home.tsx";
import AddGame, {SaveGame} from "./AddGame.tsx";
import SearchGame from "./SearchGame.tsx";
import EditGame from "./EditGame.tsx";

import './app.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="search" element={<SearchGame />} />
                      <Route path="add-game/:appid" element={<AddGame />} />
                      <Route path="add-game/:appid/add" element={<SaveGame />} />
                      <Route path="edit-game/:appid" element={<EditGame />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
