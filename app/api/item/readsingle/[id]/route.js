
import { NextResponse } from "next/server";
import connectDB from "@/app/api/db/connect";
import { ItemModel } from "@/app/api/models/item";

export async function GET(request, context) {
    try {
        await connectDB();
        const params = await context.params;
        const singleItem = await ItemModel.findById(params.id);
        if (!singleItem) {
            return NextResponse.json({ message: 'ページが存在しません' }, { status: 404 });
        }
        return NextResponse.json({ message: 'アイテム読み取り成功シングル', singleItem: singleItem }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム読み取り失敗シングル' }, { status: 500 });
    }
};