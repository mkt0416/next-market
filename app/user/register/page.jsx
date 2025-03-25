
'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push('/user/login');
        } catch (err) {
            console.log(err);
            alert('ユーザー登録失敗');
        }
    };

    return (
        <div>
            <h1 className='page-title'>ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name='name'
                    placeholder='名前'
                    required
                />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name='email'
                    placeholder='メールアドレス'
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    name='password'
                    placeholder='パスワード'
                    required
                />
                <button type='submit'>登録</button>
            </form>
        </div>
    );
};

export default Register;