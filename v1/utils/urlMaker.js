
const textToUrl = (text) => {
    const url = text.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    return url
}

module.exports = {
    textToUrl
}