/**
 * Structure returned in a authUserQuery
 */
export interface AuthUser {
  /**
   * Identifier of the user.
   * Must be unique.
   */
  id: number;

  /**
   * Name of the user.
   */
  name: string;

  /**
   * Encrypted password of the user.
   * Passwords are encrypted using the bcrypt library.
   */
  hashed: string;
}