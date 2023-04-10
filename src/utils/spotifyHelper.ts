import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();


const code = '';

export const spotifyHelperInitializer = async () => {
  const scopes = ['user-read-private', 'user-read-email'];
  const state = 'my-private-spotify-helper';
  const redirectUri = 'http://localhost:3000/spotify-code';
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUri,
  });

  if (!code) {
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log('authorizeURL', authorizeURL);
    return;
  }

  spotifyApi.authorizationCodeGrant(code);
  const credentials = await spotifyApi.authorizationCodeGrant(code);
  if (!credentials.body?.access_token) {
    console.log(
      'Something went wrong when retrieving an access token',
      credentials,
    );
    return null;
  }
  spotifyApi.setAccessToken(credentials.body['access_token']);
  spotifyApi.setRefreshToken(credentials.body['refresh_token']);
  console.log('spotifyApi initialized');

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
