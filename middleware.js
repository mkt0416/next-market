
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const token = await request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'トークンがありません' });
    }

    try {
        const secretKey = new TextEncoder().encode('next-market-app-book');
        const decodedJwt = await jwtVerify(token, secretKey);
        console.log(decodedJwt);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'トークンが正しくないので、ログインしてください' });
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/api/item/create',
        '/api/item/update/:path*',
        '/api/item/delete/:path*',
    ],
};