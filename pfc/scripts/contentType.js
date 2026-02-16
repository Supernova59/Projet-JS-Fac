export const getContentTypeFrom = (url) => {
    if (url.endsWith('.css')) return 'text/css';
    if (url.endsWith('.js')) return 'application/javascript';
    if (url.endsWith('.html')) return 'text/html';
    if (url.endsWith('.png')) return 'image/png';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
    if (url.endsWith('.ico')) return 'image/x-icon';
    return 'text/plain';
};