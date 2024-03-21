import { useState } from 'react';
import Modal from 'react-modal';

const GetPoster = ({ isOpen, onClose, event }) => {

    const { name, image_url, start_date, end_date, location } = event;
    const date = new Date(start_date).toLocaleDateString();
    const startTime = new Date(start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    const sizeOptions = [
        { label: 'Download only' },
        { label: 'A3 (common)', width: '297mm', height: '420mm' },
        { label: 'A4', width: '210mm', height: '297mm' },
        { label: 'A5', width: '148mm', height: '210mm' },
        { label: '4x6 inches', width: '4in', height: '6in' },
        { label: '5x7 inches', width: '5in', height: '7in' }
    ];
    const [ printSize, setPrintSize ] = useState(sizeOptions[1].label);
    const [ generateText, setGenerateText ] = useState(false);

    const onConfirm = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const image = new Image();
        image.src = image_url;
        image.onload = () => {
            // Can't add text to small images
            if (generateText && (image.height < 300 || image.width < 300)) {
                alert('The image is too small to add text. Please upload a larger image.');
                canvas.remove();
                image.remove();
                return onClose();
            }

            // Draw image
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);

            // Add text
            if (generateText) {
                context.fillStyle = 'rgba(0, 0, 0, 0.5)';
                context.fillRect(0, canvas.height - 200, canvas.width, 200);

                context.font = 'bold 50px Arial';
                context.fillStyle = 'white';
                context.fillText(name, 25, canvas.height - 140);

                context.font = '25px Arial';
                context.fillText(date, 25, canvas.height - 100);
                context.fillText(`${startTime} - ${endTime}`, 25, canvas.height - 70);
                context.fillText(`Location: ${location}`, 25, canvas.height - 20);
            }

            const base64Url = canvas.toDataURL('image/jpeg', 1);
            let html;

            //If download, use an image tag so it can be saved
            if (printSize === 'Download only') {
                html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${name}</title>
                    </head>
                    <body style="margin:0;">
                        <img style="height:100%;" src="${base64Url}" alt="Event Poster">
                    </body>
                    </html>
                `;
            }
            // If print, use background-image and fill the selected print size
            else {
                const { width, height } = sizeOptions.find((s) => s.label === printSize);

                html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${name}</title>
                        <style>
                            @page {
                                size: ${width} ${height};
                                margin: 0;
                            }
                            @media print {
                                html, body {
                                    width: ${width};
                                    height: ${height};
                                }
                            }
                            body {
                                margin: 0;
                                background-size: cover;
                                background-repeat: no-repeat;
                                background-position: center center;
                                background-image: url(${base64Url});
                            }
                        </style>
                    </head>
                    <body></body>
                    </html>
                `;
            }

            const newTab = window.open('about:blank', '_blank');
            newTab.document.open();
            newTab.document.write(html);
            newTab.document.close();

            if (printSize !== 'Download only') {
                //trigger print
                newTab.onload = () => {
                    newTab.focus();
                    newTab.print();
                };
            }

            canvas.remove();
            image.remove();
            onClose();
        };
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName='fixed inset-0 bg-black/80 z-50'
        >
            <div className='fixed inset-0 flex items-center justify-center p-4 w-screen h-screen'>
                <div className='max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md'>
                    <h1 className="text-2xl text-black font-semibold">Get poster</h1>

                    <div className='my-3'>
                        <label className="flex items-center">
                            <input
                                checked={generateText}
                                onChange={(e) => setGenerateText(e.target.checked)}
                                type="checkbox"
                                className="form-checkbox"
                            />
                            <span className="ml-2 text-sm">
                                Overlay the event name, date, and location in the poster
                            </span>
                        </label>
                    </div>

                    <div className='flex items-center mb-3'>
                        <label className="block flex-shrink-0">Print size: </label>
                        <select
                            value={printSize}
                            onChange={(e) => setPrintSize(e.target.value)}
                            className="flex-grow-1 ml-3 px-2 py-1 text-base border border-gray-300 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm rounded-md"
                        >
                            {
                                sizeOptions.map((s) => (
                                    <option key={s.label} value={s.label}>{s.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <span className='text-neutral-500 text-xs'>
                        Note: The image will be cropped to fill the selected print size. Remember to enable background graphics in print options.
                    </span>

                    <div className='flex items-center justify-end gap-3 mt-4'>
                        <button onClick={onClose} className="bg-transparent hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GetPoster;