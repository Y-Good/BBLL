// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;

//加密密码
export async function encrypt(password: string) {
    return await bcrypt.hash(password, saltRounds);
}

//密码对比
export async function compares(password:string,dbpassword:string) {
    return await bcrypt.compare(password,dbpassword)
}