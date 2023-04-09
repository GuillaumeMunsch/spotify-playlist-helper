import { SpotifyHelper, spotifyHelperInitializer } from './spotifyHelper';

export const main = async () => {
  const spotifyApi = await spotifyHelperInitializer();
  if (!spotifyApi) {
    return;
  }
  const spotifyHelper = new SpotifyHelper(spotifyApi);
};
