import { getYouTubeThumbnail } from "@/lib/utils";

const images = [
    'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];

export async function getRecentActivityData() {
    try {
        const response = await fetch('http://16.16.25.254:8000/api/v1/panel/contents/');
        if (!response.ok) {
            throw new Error('Failed to fetch recent activity data');
        }
        const data = await response.json();
        
        const processedData = data.slice(0, 4).map((item, index) => ({
            id: item.id.toString(),
            title: item.title,
            lastAccessed: item.created_at,
            icon: getYouTubeThumbnail(item.video_link),
            subject: item.topic.toString(), // Assuming topic can be used as a subject
            progress: Math.floor(Math.random() * 101), // Assuming progress based on completion
            color: '#4361EE' // Default color
        }));

        return processedData;
    } catch (error) {
        console.error('Error fetching recent activity data:', error);
        return [];
    }
}

const subjectImageMap = {
    "mathematics": '/subject/maths.png',
    "science": '/subject/science.png',
    "computer science": '/subject/sst.png',
    "physics": '/subject/subject/phy.png',
    "chemistry": '/subject/subject/chem.png',
    "biology": '/subject/subject/bio.png'
};

const progressMap = {
    "biology": 10,
    "chemistry": 77,
    "physics": 43
};

export async function getSubjectsData() {
    try {
        const response = await fetch('http://16.16.25.254:8000/api/v1/panel/subjects/');
        if (!response.ok) {
            throw new Error('Failed to fetch subjects data');
        }
        const data = await response.json();
        
        const processedData = data.map(item => {
            const subjectName = item.name.toLowerCase();
            const progress = progressMap[subjectName] !== undefined ? progressMap[subjectName] : Math.floor(Math.random() * 101);

            return {
                id: item.id.toString(),
                subject: item.name,
                icon: subjectImageMap[subjectName] || '/logo.png', // Default icon
                progress: progress,
                color: '#4361EE', // Default color
                nextTopic: "Next Topic", // Placeholder
                teacher: "Teacher Name" // Placeholder
            };
        });

        return processedData;
    } catch (error) {
        console.error('Error fetching subjects data:', error);
        return [];
    }
}

export async function getChaptersData(subjectId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/students/subjects/${subjectId}/chapters/`);
        if (!response.ok) {
            throw new Error('Failed to fetch chapters data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching chapters data for subject ${subjectId}:`, error);
        return [];
    }
}

export async function getSubjectDetails(subjectId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/panel/subjects/${subjectId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch subject details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching subject details for subject ${subjectId}:`, error);
        return null;
    }
}

export async function getTopicsWithContents(chapterId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/students/chapters/${chapterId}/topics-with-contents/`);
        if (!response.ok) {
            throw new Error('Failed to fetch topics with contents');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching topics with contents for chapter ${chapterId}:`, error);
        return [];
    }
}

export async function getContentDetails(contentId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/panel/contents/${contentId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch content details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching content details for content ${contentId}:`, error);
        return null;
    }
}

export async function getContentAncestors(contentId) {
    try {
        const response = await fetch(`http://16.16.25.254:8000/api/v1/panel/contents/${contentId}/ancestors/`);
        if (!response.ok) {
            throw new Error('Failed to fetch content ancestors');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching content ancestors for content ${contentId}:`, error);
        return null;
    }
}