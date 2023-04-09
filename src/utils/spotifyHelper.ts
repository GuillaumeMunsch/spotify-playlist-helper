import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

export const spotifyHelperInitializer = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  const credentials = await spotifyApi.clientCredentialsGrant();
  if (!credentials.body?.access_token) {
    console.log(
      'Something went wrong when retrieving an access token',
      credentials,
    );
    return null;
  }
  console.log('spotifyApi initialized');

  spotifyApi.setAccessToken(credentials.body['access_token']);
  return spotifyApi;
};

export class SpotifyHelper {
  constructor(private spotifyApi: SpotifyWebApi) {}

  async getMySavedTracks(): Promise<SpotifyApi.UsersSavedTracksResponse> {
    const data = await this.spotifyApi.getMySavedTracks();
    return data.body;
  }

  async getUser(userId: string) {
    const data = await this.spotifyApi.getUser(userId);
    return data.body;
  }
}
