
'use client'
import useAuth from '@/app/utils/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeleteItem = (context) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const loginUserEmail = useAuth();

    useEffect(() => {
        const getSingleItem = async () => {
            try {
                const params = await context.params;
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`);
                const jsonData = await response.json();
                const { title, price, image, description, email } = jsonData.singleItem;
                setTitle(title);
                setPrice(price);
                setImage(image);
                setDescription(description);
                setEmail(email);
                setLoading(true);
            } catch (err) {
                console.log(err);
            }
        };
        getSingleItem();
    }, [context]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = await context.params;
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    email: 'hello@mkt.com',
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push('/');
        } catch (err) {
            console.log(err);
            alert('アイテム削除失敗');
        }
    };

    if (loading) {
        if (loginUserEmail === email) {
            return (
                <div className='delete-page'>
                    <h1 className='page-title'>アイテム削除</h1>
                    <form onSubmit={handleSubmit}>
                        <h1>{title}</h1>
                        {image &&
                            <Image
                                src={image}
                                alt='item-image'
                                width={750}
                                height={500}
                                priority
                            />
                        }
                        <h2>￥{price}</h2>
                        <p>{description}</p>
                        <button type='submit'>削除</button>
                    </form>
                </div>
            );
        } else {
            return <h1>権限がありません</h1>
        }
    } else {
        return <h1>ローディング中...</h1>
    }
};

export default DeleteItem;