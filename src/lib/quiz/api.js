export async function getAllTopics() {
    try {
        const response = await fetch('http://16.16.25.254:8000/api/v1/panel/topics/');
        if (!response.ok) {
            throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        return [];
    }
}

export async function getQuizByTopicId(topicId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/quiz/quiz-detail/${topicId}/`);
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Not found, so no quiz for this topic
            }
            throw new Error(`Failed to fetch quiz for topic ${topicId}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching quiz for topic ${topicId}:`, error);
        return null;
    }
}