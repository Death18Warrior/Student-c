"use client"

import { useState } from "react"
import { Bookmark } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { getYouTubeThumbnail } from "@/lib/utils"

export default function ChapterDetails({ chapters }) {
    const [expandedChapters, setExpandedChapters] = useState([chapters[0]?.id || ""])

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-500"
            case "in-progress":
                return "bg-yellow-500"
            default:
                return "bg-gray-300"
        }
    }

    return (
        <Accordion type="multiple" value={expandedChapters} onValueChange={setExpandedChapters} className="space-y-4 ">
            {chapters.map((chapter) => (
                <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="border rounded-xl bg-gradient-to-r from-blue-50 to-blue-200 shadow-sm overflow-hidden"
                >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${getStatusColor(chapter.status)}`}></span>
                                        <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{chapter.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <span className="text-sm font-medium text-gray-900">{chapter.progress}%</span>
                                    <div className="mt-1 w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getStatusColor(chapter.status)} rounded-full`}
                                            style={{ width: `${chapter.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="space-y-6">
                            {chapter.topics.map((topic) => (
                                <div key={topic.id}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{topic.title}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {topic.contents.map((content) => {
                                            const thumbnailUrl = content.video_link ? getYouTubeThumbnail(content.video_link) : content.image;
                                            return (
                                                <Link href={`/courses/content2/${content.id}`} key={content.id}>
                                                    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer">
                                                        <div className="relative h-48">
                                                            {thumbnailUrl && (
                                                                <img
                                                                    src={thumbnailUrl}
                                                                    alt={content.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-transform">
                                                                    Start Learning
                                                                </button>
                                                            </div>
                                                            <div className="absolute top-4 right-4">
                                                                <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                                                    <Bookmark className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="p-6">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}