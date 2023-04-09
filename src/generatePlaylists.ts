import { SpotifyHelper, spotifyHelperInitializer } from './utils/spotifyHelper';
import dotenv from 'dotenv';
dotenv.config();

const generatePlaylists = async () => {
  const api = await spotifyHelperInitializer();
  if (!api) {
    return;
  }
  const spotifyHelper = new SpotifyHelper(api);

  if (!process.env.MY_USER_ID) {
    console.log('No MY_USER_ID provided in env');

    return;
  }

  const savedSongs = await spotifyHelper.getMySavedTracks();
  console.log('Saved songs', savedSongs.total);
};

generatePlaylists();
