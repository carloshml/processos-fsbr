export const readFileAsBase64 = async function readFileAsBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const base64Content = e.target.result.split(",")[1];
            resolve(base64Content);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

export const base64ToFile = function base64ToFile(base64String: string, fileName: string) {
    try {
        const decodedData = atob(base64String);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName || 'downloaded-file.pdf';
        anchor.textContent = 'Download PDF';
        anchor.click();
    } catch (error) {
        console.error('Error decoding Base64 data:', error);
    }
};