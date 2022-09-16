import * as bcrypt from 'bcrypt';

export class Crypto {
  public async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, process.env.PASSWORD_GEN_SALT);
  }

  public async verifyPassword(password: string,hash:string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
    
}
