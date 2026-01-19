export class userUnauthenticated extends Error {
  constructor() {
    super("Usuário não autenticado.");
  }
}
