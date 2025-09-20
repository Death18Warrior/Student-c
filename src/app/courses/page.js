import AllCourses from "@/components/courses/AllCourses";
import { getSubjectsData } from "@/lib/dashboard/api";

export default async function MyCoursesPage() {
    const subjectsData = await getSubjectsData();

    return (
        <main className='w-full flex justify-center items-center bg-gray-100 pb-5'>
            <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                <AllCourses subjectsData={subjectsData} />
            </section>
        </main>
    );
}
