
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request, context) {
    try {
        await connectDB();
        const params = await context.params;
        const singleItem = await ItemModel.findById(params.id);
        if (!singleItem) {
            return NextResponse.json({ message: 'ページが存在しません' });
        }
        return NextResponse.json({ message: 'アイテム読み取り成功(シングル)', singleItem: singleItem });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'アイテム読み取り失敗(シングル)' });
    }
};