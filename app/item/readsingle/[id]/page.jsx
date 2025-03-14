
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const getSingleItem = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`);
        const jsonData = await response.json();
        const singleItem = jsonData.singleItem;
        return singleItem;
    } catch (err) {
        console.log(err);
    }
};

const ReadSIngleItem = async (context) => {
    const params = await context.params;
    const singleItem = await getSingleItem(params.id);
    const { title, price, image, description, _id } = singleItem;

    return (
        <div className='grid-container-si'>
            <div>
                {image && <Image
                    src={image}
                    width={750}
                    height={500}
                    alt='item-image'
                    priority
                />}
            </div>
            <div>
                <h1>{title}</h1>
                <h2>￥{price}</h2>
                <hr />
                <p>{description}</p>
            </div>
            <div>
                <Link href={`/item/update/${_id}`}>編集</Link>
                <Link href={`/item/delete/${_id}`}>削除</Link>
            </div>
        </div>
    );
};

export default ReadSIngleItem;