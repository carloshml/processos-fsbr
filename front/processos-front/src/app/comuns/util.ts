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