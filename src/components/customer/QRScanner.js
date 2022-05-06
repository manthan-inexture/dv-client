import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Decoder } from "@nuintun/qrcode";
import { QrReader } from 'react-qr-reader';

function QRScanner() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const inputRef = useRef();
    useEffect(() => {
        if (data) {
            navigate(data);
        }
    }, [data,navigate]);
    const onImageChange = (event) => {
        const qrcode = new Decoder();
        qrcode
            .scan(URL.createObjectURL(event.target.files[0]))
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <div className="text-center">
            <h1>QR Scanner</h1>
            <button className="btn btn-primary" onClick={() => inputRef.current.click()}>
                Scan with photo
            </button>
            <input type="file" ref={inputRef} className='d-none' onChange={onImageChange} />
            <div className="row m-0 p-0">
                <QrReader
                    constraints={{
                        // audio: false,
                        // video: true,
                        facingMode: "environment"
                    }}
                    className='qr-scanner'
                    onResult={(result, err) => {
                        if (!!result) {
                            setData(result?.text)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default QRScanner