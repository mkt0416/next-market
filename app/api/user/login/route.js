
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import bcrypt from 'bcryptjs';
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const savedUserData = await UserModel.findOne({ email: reqBody.email });
        if (savedUserData) {
            const passwordValid = await bcrypt.compare(reqBody.password, savedUserData.password);
            if (passwordValid) {
                const secretKey = new TextEncoder().encode('next-market-app-book');
                const payload = {
                    email: reqBody.email,
                };
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setExpirationTime('1d')
                    .sign(secretKey)
                return NextResponse.json({ message: 'ログイン成功', token: token }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'ログイン失敗: パスワードが無効です' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: 'ログイン失敗: ユーザー名が無効です' }, { status: 401 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'ログイン失敗' }, { status: 500 });
    }
};