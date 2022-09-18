import * as bcrypt from 'bcrypt';

export class Crypto {
  public async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.PASSWORD_GEN_SALT));
  }

  public async verifyPassword(password: string,hashPassword:string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
    
}
