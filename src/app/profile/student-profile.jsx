"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "./profile-info";
import QuizResults from "./quiz-results";
import HelpSupport from "./help-support";
import LearningStreakCard from "@/components/dashboard/LearningStreakCard";
import {
  recentActivityData,
  streakData,
  performanceData,
  achievementsData,
  reportsData,
} from "../lib/data";

import PerformanceChart from "@/components/dashboard/PerformanceChart";

export default function StudentProfile({ student: apiStudent }) {
  const studentData = {
    name: apiStudent.full_name,
    avatar: apiStudent.profile_picture,
    school: `School ID: ${apiStudent.school}`,
    grade: apiStudent.class || 'N/A',
    quizResults: [], // API does not provide this yet
    // Add other fields from the API as needed by child components
    roll_number: apiStudent.roll_number,
    guardian_name: apiStudent.guardian_name,
    contact_number: apiStudent.contact_number,
    date_of_birth: apiStudent.date_of_birth,
    gender: apiStudent.gender,
    address: apiStudent.address,
    admission_date: apiStudent.admission_date,
    gpa: apiStudent.gpa,
  };

  return (
    <>
      <div className="w-full mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
        <div className=" rounded-xl shadow-md overflow-hidden mb-8">
          <div
            className="relative w-full bg-cover bg-center z-20"
            style={{ backgroundImage: "url('/profilebg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-30"></div>

            <ProfileInfo student={studentData} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
          <LearningStreakCard />
          <PerformanceChart performanceData={performanceData} />
        </div>
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient1">
            <TabsTrigger value="results">Quiz Results</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>
          <TabsContent
            value="results"
            className="bg-white p-6 rounded-xl shadow-md mt-4"
          >
            <QuizResults results={studentData.quizResults} />
          </TabsContent>
          <TabsContent
            value="help"
            className="bg-white p-6 rounded-xl shadow-md mt-4"
          >
            <HelpSupport />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
