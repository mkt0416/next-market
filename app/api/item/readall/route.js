
import { NextResponse } from "next/server";
import connectDB from "../../db/connect";
import { ItemModel } from "../../models/item";

export const revalidate = 0;

export async function GET() {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return NextResponse.json({ message: 'アイテム読み取り成功オール', allItems: allItems }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム読み取り失敗オール' }, { status: 500 });
    }
};