"use client"

import { useState, useMemo } from "react"
import CourseHeader from "@/components/ContentPage/course-header"
import CourseSidebar from "@/components/ContentPage/course-sidebar"
import CourseTabs from "@/components/ContentPage/course-tabs"
import { getYouTubeVideoId } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AiAssistant from "@/components/ContentPage/AiAssistant"

export default function ContentClientPage2({ content, topics }) {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const { course, currentLesson, prevLesson, nextLesson } = useMemo(() => {
    const allLessons = topics.flatMap(topic => topic.contents.map(c => ({ ...c, topicTitle: topic.title })))
    const currentLessonIndex = allLessons.findIndex(l => l.id === content.id)

    const currentLesson = allLessons[currentLessonIndex];

    if (!currentLesson) {
      return { 
        course: { 
          title: content.title,
          studentCount: 0,
          ratingCount: 0,
          totalDuration: '0m',
          sections: []
        }, 
        currentLesson: {}, 
        prevLesson: null, 
        nextLesson: null 
      };
    }

    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    const course = {
      title: content.title,
      studentCount: 12345,
      ratingCount: 543,
      totalDuration: '1h 30m',
      sections: topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        lessons: topic.contents.map(c => ({ ...c, id: c.id.toString() })),
      })),
      currentLesson: {
        ...currentLesson,
        type: currentLesson.video_link ? "video" : "article",
        videoUrl: currentLesson.video_link,
      },
    };

    return { course, currentLesson, prevLesson, nextLesson };
  }, [content, topics]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CourseHeader course={course} onAiAssistantToggle={() => setAiAssistantOpen(!aiAssistantOpen)} />

      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div className="relative pt-[56.25%] bg-black rounded-lg">
            {course.currentLesson.type === "video" && (
              <iframe
                key={course.currentLesson.id}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.currentLesson.videoUrl)}`}
                title={course.currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {currentLesson.type === "article" && (
            <div className="prose max-w-none p-6">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.text_content }} />
            </div>
          )}

          <div className="flex justify-between mt-4">
            {prevLesson ? (
              <Link href={`/courses/content2/${prevLesson.id}`}>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <Link href={`/quizzes`}>
                <Button variant="outline" className="flex bg-blue-50 justify-center items-center text-blue-600 hover:text-blue-800 p-2">
                  Quiz
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/simulation`}>
                <Button variant="outline" className="flex bg-blue-50 justify-center items-center text-blue-600 hover:text-blue-800 p-2">
                  Simulation
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              {nextLesson && (
                <Link href={`/courses/content2/${nextLesson.id}`}>
                  <Button variant="outline" className="flex bg-blue-50 justify-center items-center text-blue-600 hover:text-blue-800 p-2">
                    Next Lesson
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="mt-4">
            <CourseTabs course={course} />
          </div>
        </main>

        <aside className="w-80 border-l border-gray-200 overflow-y-auto hidden lg:block">
          <CourseSidebar course={course} />
        </aside>

        <div className="lg:hidden sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
          <Sheet open={open} onOpenChange={setOpen} side="right">
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Course Content</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <CourseSidebar course={course} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AiAssistant isOpen={aiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />
    </div>
  )
}