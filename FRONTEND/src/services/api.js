
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const searchWords = async (matrix, words) => {
    try {

        const response = await fetch(`${API_BASE_URL}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                matrix: matrix,
                words: words,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching words:", error);
        throw error;
    }
};