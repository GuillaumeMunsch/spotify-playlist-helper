import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

export const spotifyHelperInitializer = async () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-modify',
    'user-library-read',
  ];
  const state = 'my-private-spotify-helper';
  const redirectUri = 'http://localhost:3000/spotify-code';
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUri,
  });
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  console.log('authorizeURL', authorizeURL);

  return spotifyApi;
};

export class SpotifyHelper {
  constructor(private spotifyApi: SpotifyWebApi) {}

  async loginWithCode(code: string) {
    const credentials = await this.spotifyApi.authorizationCodeGrant(code);
    console.log('credentials', credentials);

    if (!credentials.body?.access_token) {
      console.log(
        'Something went wrong when retrieving an access token',
        credentials,
      );
      return null;
    }
    this.spotifyApi.setAccessToken(credentials.body['access_token']);
    this.spotifyApi.setRefreshToken(credentials.body['refresh_token']);
    console.log('spotifyApi initialized');

    return this.spotifyApi;
  }

  async generatePlaylists(): Promise<any> {
    const myTracks = await this.getMySavedTracks();
    console.log('My tracks', myTracks);
  }

  async getMySavedTracks(): Promise<SpotifyApi.UsersSavedTracksResponse> {
    const data = await this.spotifyApi.getMySavedTracks();
    return data.body;
  }

  async getUser(userId: string) {
    const data = await this.spotifyApi.getUser(userId);
    return data.body;
  }
}
