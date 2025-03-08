
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        const userData = {
            ...reqBody,
            password: hashedPassword,
        };
        await UserModel.create(userData);
        return NextResponse.json({ message: 'ユーザー登録成功' });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'ユーザー登録失敗' });
    }
};