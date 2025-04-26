
'use client'
import useAuth from '@/app/utils/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateItem = (context) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [loding, setLoading] = useState(false);
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail,
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push('/');
        } catch (err) {
            console.log(err);
            alert('アイテム編集失敗');
        }
    };

    if (loding) {
        if (loginUserEmail === email) {
            return (
                <div>
                    <h1 className='page-title'>アイテム編集</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name='title'
                            placeholder='アイテム名'
                            required
                        />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            name='price'
                            placeholder='価格'
                            required
                        />
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="text"
                            name='image'
                            placeholder='画像'
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name='description'
                            placeholder='商品説明'
                            rows={15}
                            required
                        />
                        <button type='submit'>編集</button>
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

export default UpdateItem;