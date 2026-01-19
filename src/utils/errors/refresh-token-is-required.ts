export class RefreshSecretIsRequired extends Error {
  constructor() {
    super("JWT refresh secret not found.");
  }
}
