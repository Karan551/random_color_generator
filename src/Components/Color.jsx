import React, { useEffect, useState, useRef } from 'react';
import '../index.css';

const Color = () => {

    const [generate, setGenerate] = useState(false);
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('black');
    const [copyBtnText, setCopyBtnText] = useState("copy");

    const randomNumber = (length) => {
        return Math.floor(Math.random() * length);
    };



    const handleHexColor = () => {
        const hexString = "0123456789ABCDEF";
        let hexColor = '#';

        for (let i = 1; i <= 6; i++) {
            hexColor += hexString[randomNumber(hexString.length)];
        }
        setColor(hexColor);
        setTypeOfColor('hex');

    };


    const handleRGBColor = () => {
        const redColor = randomNumber(256);
        const greenColor = randomNumber(256);
        const blueColor = randomNumber(256);

        const rgbColor = `rgb(${redColor},${greenColor},${blueColor})`;

        setColor(rgbColor);
        setTypeOfColor("rgb");

    };

    const colorRef = useRef(null);
    const handleCopyColor = () => {
        // Select the text field
        colorRef.current.select();
        // this is the maximum selection data
        colorRef.current.setSelectionRange(0, 100);
        // this is actual function that write text into clipboard
        window.navigator.clipboard.writeText(color);
    };

    useEffect(() => {
        setCopyBtnText('copy');
    },
        [typeOfColor, color, generate]);



    return (
        <>
            <main style={{ backgroundColor: color}} className='main-container'>
                <div className='wrapper'

                >
                    <div className='btn-container'>

                        <button className='btn'
                            onClick={() => setGenerate(!generate)}
                        >Generate Random Color {generate ? "ON" : "OFF"}</button>
                    </div>
                    <div className='btn-container'>

                        <button className='btn' onClick={() => (generate && handleHexColor())}
                            disabled={!generate}
                        >HEX Color</button>
                    </div>
                    <div className='btn-container'>

                        <button className='btn' onClick={() => (generate && handleRGBColor())}
                            disabled={!generate}
                        >RGB Color</button>
                    </div>



                </div>
                <div className='color-name'>
                    <h2>{typeOfColor === "rgb" ? "RGB" : "HEX"} COLOR</h2>
                    <div className='color-value'>
                        <input
                            className='input-color-value'
                            value={color}
                            ref={colorRef}
                            readOnly
                        />



                        <button
                            className='btn copy-button'
                            onClick={() => (handleCopyColor(), setCopyBtnText("copied"))}

                        >
                            {copyBtnText}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Color;
