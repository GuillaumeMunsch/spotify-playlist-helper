import fastify, { FastifyRequest } from 'fastify';
import { SpotifyHelper, spotifyHelperInitializer } from './utils/spotifyHelper';
import dotenv from 'dotenv';
dotenv.config();

type MyRequest = FastifyRequest<{
  Querystring: { code: string };
}>;

const start = async () => {
  const api = await spotifyHelperInitializer();
  if (!api) {
    return;
  }
  const spotifyHelper = new SpotifyHelper(api);

  const fastifyInstance = fastify();
  fastifyInstance.get('/spotify-code', async (request: MyRequest, reply) => {
    console.log('request.query', request.query);
    const { code } = request.query;

    console.log('Code', code);

    await spotifyHelper.loginWithCode(code);
    spotifyHelper.generatePlaylists();

    return {};
  });

  fastifyInstance.listen(3000, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
};
start();
