
import { NextResponse } from "next/server";
import connectDB from "../../db/connect";
import { ItemModel } from "../../models/item";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        await ItemModel.create(reqBody);
        return NextResponse.json({ message: 'アイテム作成成功' }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム作成失敗' }, { status: 500 });
    }
};