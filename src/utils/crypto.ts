import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class Crypto {
  public async encryptPassword(password: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(
      process.env.PASSWORD_GEN_KEY,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);
    return encryptedPassword.toString();
  }
}
