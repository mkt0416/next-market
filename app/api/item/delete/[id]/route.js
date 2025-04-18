
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const params = await context.params;
        const singleItem = await ItemModel.findById(params.id);
        if (!singleItem) {
            return NextResponse.json({ message: 'ページがありません' });
        }
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({ _id: params.id });
            return NextResponse.json({ message: 'アイテム削除成功' }, { status: 200 });
        } else {
            return NextResponse.json({ message: '他の人が作成したアイテムです' });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム削除失敗' }, { status: 500 });
    }
};