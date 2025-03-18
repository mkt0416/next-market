
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header>
            <Link href={'/'}>
                <Image
                    src={'/header.svg'}
                    width={1330}
                    height={148}
                    priority
                    alt='header-image'
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
    );
};

export default Header;