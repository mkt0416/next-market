
import React, { useState } from 'react'

const ImgInput = ({ setImage }) => {
    const [imageFile, setImageFile] = useState();

    const handleclick = async () => {
        try {
            const data = new FormData();
            data.append('file', imageFile);
            data.append('upload_preset', 'sabopa33');
            data.append('cloud_name', 'dvuji735y');

            const response = await fetch('https://api.cloudinary.com/v1_1/dvuji735y/image/upload', {
                method: 'POST',
                body: data,
            });
            const jsonData = await response.json();
            setImage(jsonData.url);
            alert('画像アップロード成功');
        } catch (err) {
            console.log(err);
            alert('画像アップロード失敗');
        }
    };

    return (
        <div className='img-input'>
            <input
                onChange={(e) => setImageFile(e.target.files[0])}
                type="file"
                accept='image/png image/jpg'
            />
            <button
                onClick={handleclick}
                disabled={!imageFile}
            >
                画像アップロード
            </button>
        </div>
    );
};

export default ImgInput;