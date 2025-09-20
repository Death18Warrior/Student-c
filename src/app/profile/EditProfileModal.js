"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen } from "lucide-react";
import { useState } from "react";

// Avatar options - you can replace these with your own avatar images
const AVATAR_OPTIONS = [
    "/avatar.png",
    "/avatar2.png",
    "/avatar3.png",
    "/avatar4.png",
    "/avatar5.png"
];

export default function EditProfileModal({ student }) {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState(student.contact_number || "");
    const [selectedAvatar, setSelectedAvatar] = useState(student.avatar || AVATAR_OPTIONS[0]);

    const handleSubmit = async () => {
        const updatedStudent = {
            ...student,
            contact_number: phone,
            profile_picture: selectedAvatar,
        };

        const res = await fetch(`http://16.16.25.254:8000/api/v1/students/profile/2/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStudent),
        });

        if (res.ok) {
            setOpen(false);
            window.location.reload();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Pen className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-2">
                    {/* Avatar Selection */}
                    <div>
                        <label className="text-sm font-semibold mb-3 block">Choose Avatar</label>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {AVATAR_OPTIONS.map((avatarUrl, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer transition-all duration-200 ${selectedAvatar === avatarUrl
                                        ? "ring-4 ring-blue-500 ring-offset-2 rounded-full"
                                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 rounded-full"
                                        }`}
                                    onClick={() => setSelectedAvatar(avatarUrl)}
                                >
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={avatarUrl}
                                            alt={`Avatar ${index + 1}`}
                                            className="rounded-full"
                                        />
                                        <AvatarFallback>
                                            A{index + 1}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Name</label>
                        <Input value={student.name || ""} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Class</label>
                        <Input value={student.grade || ""} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">School</label>
                        <Input value={student.school || ""} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Mobile Number</label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <Button onClick={handleSubmit} className="w-full">Save Changes</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}