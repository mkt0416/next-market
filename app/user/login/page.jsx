
'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            localStorage.setItem('token', jsonData.token);
            router.push('/');
        } catch (err) {
            console.log(err);
            alert('ログイン失敗');
        }
    };

    return (
        <div>
            <h1 className='page-title'>ログイン</h1>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>ログイン</button>
            </form>
        </div>
    );
};

export default Login;