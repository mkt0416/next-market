
import React from 'react'
import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <div>
            <header>
                <Link href={'/'}>
                    <Image
                        src={'/header.svg'}
                        alt="header-icon"
                        width={1330}
                        height={148}
                        priority
                    />
                </Link>
                <nav>
                    <ul>
                        <li><Link href={'/user/register'}>登録</Link></li>
                        <li><Link href={'/user/login'}>ログイン</Link></li>
                        <li><Link href={'/item/create'}>アイテム作成</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;