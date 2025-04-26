
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const dynamic = 'force-dynamic';

const getAllItems = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`);
        const jsonData = await response.json();
        const allItems = jsonData.allItems;
        return allItems;
    } catch (err) {
        console.log(err);
    }
};

const ReadAllItems = async () => {
    const allItems = await getAllItems();

    return (
        <div>
            <div className='grid-container-in'>
                {allItems && allItems.map((item) => (
                    <Link
                        key={item._id}
                        href={`/item/readsingle/${item._id}`}
                    >
                        <Image
                            src={item.image}
                            alt='item-image'
                            width={750}
                            height={500}
                            priority
                        />
                        <div>
                            <h2>￥{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.substring(0, 80)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ReadAllItems;