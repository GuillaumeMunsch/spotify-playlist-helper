import fastify from 'fastify';
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

const fastifyInstance = fastify();
fastifyInstance.get('/spotify-code', async (request, reply) => {
  console.log('request.query', request.query);

  return {};
});

fastifyInstance.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

try {
  generatePlaylists();
} catch (error) {
  console.log('ERROR ICI');
}
