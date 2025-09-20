import { getContentDetails, getTopicsWithContents, getSubjectsData, getChaptersData } from "@/lib/dashboard/api"
import ContentClientPage2 from "./ContentClientPage2"

export async function generateMetadata(props) {
  const params = await props.params;
  const contentData = await getContentDetails(params.id)

  if (!contentData) {
    return {
      title: "Content Not Found",
    }
  }

  return {
    title: contentData.title,
    description: contentData.text_content,
  }
}

export default async function ContentPage(props) {
  const params = await props.params;
  const contentData = await getContentDetails(params.id)

  if (!contentData) {
    return <div className="container mx-auto p-4">Content not found</div>
  }

  const subjects = await getSubjectsData();
  let chapterId = null;

  for (const subject of subjects) {
    const chapters = await getChaptersData(subject.id);
    for (const chapter of chapters) {
      const topicsWithContents = await getTopicsWithContents(chapter.id);
      for (const topic of topicsWithContents) {
        if (topic.id === contentData.topic) {
          chapterId = chapter.id;
          break;
        }
      }
      if (chapterId) break;
    }
    if (chapterId) break;
  }

  const topics = chapterId ? await getTopicsWithContents(chapterId) : [];

  return <ContentClientPage2 content={contentData} topics={topics} />
}
