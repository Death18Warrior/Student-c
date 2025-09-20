import Link from "next/link"

function SubjectCard({ subject }) {
    const { subject: name, icon } = subject;

    return (
        <div className=" bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 p-1 flex flex-col items-center">
            <div className="w-full h-full overflow-hidden mb-1">
                <img
                    src={icon || "/placeholder.svg"}
                    alt={name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full rounded-md "
                />
            </div>
            <h3 className="text-sm font-medium text-gray-800">{name}</h3>
        </div>
    );
}

export default function AllSubjects({ subjects, title = "All Subjects" }) {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {subjects.map((subject) => (
                    <Link key={subject.id} href={`/dashboard/chapters/${subject.id}`} className="block">
                        <SubjectCard subject={subject} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
