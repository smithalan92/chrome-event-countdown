export function getRandomNumber() {
  const randomIds = new Uint32Array(1);
  crypto.getRandomValues(randomIds);

  return randomIds[0];
}
