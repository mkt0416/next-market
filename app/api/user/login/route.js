
import { NextResponse } from "next/server";
import connectDB from "../../db/connect";
import { UserModle } from "../../models/user";
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const savedUserData = await UserModle.findOne({ email: email });
        if (savedUserData) {
            const passwordValid = await bcrypt.compare(password, savedUserData.password);
            if (passwordValid) {
                const secretKey = new TextEncoder().encode('next-market-app-book');
                const payload = {
                    email: email,
                };
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setExpirationTime('1d')
                    .sign(secretKey)
                return NextResponse.json({ message: 'ログイン成功', token: token }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'ログイン失敗:パスワードが無効です' }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: 'ログイン失敗:メールアドレスが無効です' }, { status: 400 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'ログイン失敗' }, { status: 500 });
    }
};