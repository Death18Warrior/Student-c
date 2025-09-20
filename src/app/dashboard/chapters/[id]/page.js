import { Suspense } from "react"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"
import { getChaptersData, getSubjectDetails, getTopicsWithContents } from "@/lib/dashboard/api"
import ChapterDetails from "./ChapterDetails"

export default async function SubjectPage({ params }) {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    const subject = await getSubjectDetails(id)
    const chapters = await getChaptersData(id)

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Subject not found</h2>
                    <Link href="/dashboard" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Go Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    if (chapters.length === 0) {
        return (
            <section className="flex justify-center items-center w-full bg-gray-50">
                <div className="w-[95%] md:w-[90%] lg:w-[90%] mt-5">
                    <div className=" min-h-screen ">
                        <div className="mx-auto">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Link
                                        href="/dashboard/"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Link>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
                                        <p className="text-gray-600 mt-2">{subject.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center py-10">
                                <h2 className="text-2xl font-bold text-gray-900">Coming soon</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const chaptersWithTopics = await Promise.all(chapters.map(async (chapter) => {
        const topics = await getTopicsWithContents(chapter.id);
        return { ...chapter, topics };
    }));

    return (
        <section className="flex justify-center items-center w-full bg-gray-50">
            <div className="w-[95%] md:w-[90%] lg:w-[90%] mt-5">
                <div className=" min-h-screen ">
                    <div className="mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Link
                                    href="/dashboard/"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span>Completed</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                    <span>In Progress</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                                    <span>Not Started</span>
                                </div>
                            </div>
                        </div>

                        {/* Chapters Accordion */}
                        <Suspense fallback={<div className="text-center py-10">Loading chapters...</div>}>
                            <ChapterDetails chapters={chaptersWithTopics} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    )
}
