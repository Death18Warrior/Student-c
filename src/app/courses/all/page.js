import { getSubjectsData } from "@/lib/dashboard/api"
import AllSubjects from "@/components/courses/AllSubjects"

export default async function AllSubjectsPage() {
  const subjects = await getSubjectsData()

  return <AllSubjects subjects={subjects} />
}
