
import { useEffect, useState } from 'react'
import { jwtVerify } from "jose";
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const router = useRouter();
    const [loginUerEmail, setLoginUserEmail] = useState('');

    useEffect(() => {
        const checkJwt = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/user/login');
            }

            try {
                const secretKey = new TextEncoder().encode('next-market-app-book');
                const decodedJwt = await jwtVerify(token, secretKey);
                setLoginUserEmail(decodedJwt.payload.email);
            } catch (err) {
                console.log(err);
                router.push('/user/login');
            }
        };
        checkJwt();
    }, [router]);

    return loginUerEmail;
};

export default useAuth;