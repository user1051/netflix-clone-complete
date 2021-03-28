import React, { useEffect } from "react";
import "./App.css";
import Login from './Login';
import Player from "./Player";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi()

function App() {

  const [{ token }, dispatch] = useDataLayerValue()
  
  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = "" // hiding the token
    const _token = hash.access_token;
    if(_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      
      spotify.setAccessToken(_token)
      
      spotify.getMe().then(user => {
       dispatch({
          type: 'SET_USER',
          user: user,
        })
      })
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        })
      })
      spotify.getMyTopArtists().then((response) => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      })
      spotify.getPlaylist('37i9dQZEVXcJOnngo8rHpo').then(response => dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response
      }))
    }
  }, [token, dispatch])

  return (
    <div className="App">
      {
        token ? (
            <Player spotify={spotify}/>
        ) : (
            <Login/>
        )
      }
    </div>
  );
}

export default App;
