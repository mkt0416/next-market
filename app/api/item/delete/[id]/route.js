
import { NextResponse } from "next/server";
import connectDB from "@/app/api/db/connect";
import { ItemModel } from "@/app/api/models/item";

export async function DELETE(request, context) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const params = await context.params;
        const singleItem = await ItemModel.findById(params.id);
        if (!singleItem) {
            return NextResponse.json({ message: 'ページが存在しません' }, { status: 404 });
        }
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({ _id: params.id });
            return NextResponse.json({ message: 'アイテム削除成功' }, { status: 200 });
        } else {
            return NextResponse.json({ message: '他の人が作成したアイテムです' }, { status: 400 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム削除失敗' }, { status: 500 });
    }
};