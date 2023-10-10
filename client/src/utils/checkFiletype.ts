export function checkIfImage(file: any) {
    if (file && file.type && !file.type.startsWith('image/')) {
        alert('File should be of type image.');
        return false;
    }
    return true;
}