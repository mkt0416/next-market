
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const getSingleItem = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`);
        const jsonData = await response.json();
        const singleItem = await jsonData.singleItem;
        return singleItem;
    } catch (err) {
        console.log(err);
    }
};

const ReadSingleItem = async (context) => {
    const params = await context.params;
    const singleItem = await getSingleItem(params.id);
    const { _id, title, price, image, description } = singleItem;

    return (
        <div className='grid-container-si'>
            <div>
                {image &&
                    <Image
                        src={image}
                        alt='item-image'
                        width={750}
                        height={500}
                        priority
                    />
                }
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

export default ReadSingleItem;