import fastify from 'fastify';

const initApi = () => {
  const fastifyInstance = fastify();
  fastifyInstance.get('/', async (request, reply) => {
    console.log('La');

    return { hello: 'world' };
  });

  fastifyInstance.listen(3000, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });

  return fastifyInstance;
};

export default initApi;
