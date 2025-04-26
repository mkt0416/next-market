
import { NextResponse } from "next/server";
import connectDB from "../../db/connect";
import { UserModle } from "../../models/user";
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const password = reqBody.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            ...reqBody,
            password: hashedPassword,
        };
        await UserModle.create(userData);
        return NextResponse.json({ message: 'ユーザー登録成功' }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'ユーザー登録失敗' }, { status: 500 });
    }
};