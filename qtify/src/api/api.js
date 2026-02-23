export const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";

export const fetchTopAlbums = async () => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/albums/top`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};

export const fetchNewAlbums = async () => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/albums/new`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};

export const fetchSongs = async () => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/songs`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};

export const fetchFilters = async () => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/genres`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};
