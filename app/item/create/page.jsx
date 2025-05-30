
'use client'
import ImgInput from '@/app/components/ImgInput';
import useAuth from '@/app/utils/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();
    const loginUserEmail = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: 'POST',
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
            alert('アイテム作成失敗');
        }
    };

    if (loginUserEmail) {
        return (
            <div>
                <h1 className='page-title'>アイテム作成</h1>
                <ImgInput setImage={setImage} />
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name='title'
                        placeholder='アイテム名'
                        required
                    />
                    <input
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
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        placeholder='商品説明'
                        rows={15}
                        required
                    />
                    <button type='submit'>作成</button>
                </form>
            </div>
        );
    }
};

export default CreateItem;