export class SecretError extends Error {
  constructor() {
    super("Secret não configurado.");
  }
}
