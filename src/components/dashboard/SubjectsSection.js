import Link from "next/link"

export default function SubjectsDashboard({ subjectsData, title = "My Subjects", showViewAll = true }) {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                {showViewAll && (
                    <Link href="/courses/all" className="text-blue-600 hover:underline">
                        View All
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {subjectsData.map((subject) => (
                    <Link key={subject.id} href={`/dashboard/chapters/${subject.id}`} className="block">
                        <SubjectCard subject={subject} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SubjectCard({ subject }) {
    const { subject: name, icon, progress, color } = subject;

    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className=" bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 p-2 flex flex-col items-center">
            <div className="w-full h-full overflow-hidden mb-1">
                <img
                    src={icon || "/placeholder.svg"}
                    alt={name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded-md "
                />
            </div>
            {/* <h3 className="text-lg font-medium text-gray-800">{name}</h3> */}
            <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{progress}%</span>
                </div>
            </div>
        </div>
    );
}