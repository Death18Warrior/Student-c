import StudentProfile from "./student-profile";
import { getStudentProfile } from "@/lib/student/api";

export default async function Home() {
    const student = await getStudentProfile();

    return (
        <main className='w-full flex justify-center items-center bg-gray-100 pb-5'>
            <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                <StudentProfile student={student} />
            </section>
        </main >
    )
}
