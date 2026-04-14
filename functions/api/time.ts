export const onRequestGet = (): Response => {
  const epoch = Date.now();
  return new Response(JSON.stringify({ epoch, iso: new Date(epoch).toISOString() }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
