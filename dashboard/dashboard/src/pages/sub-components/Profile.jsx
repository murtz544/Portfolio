import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const {user} = useSelector((state) => state.user);

    return (
        <>
            <div className="w-full h-full">
                <div>
                    <div className="grid w-[100%] gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Profile</h1>
                            <p>Full Profile Preview</p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                            <div className="grid gap-2 w-full sm:w-72">
                                <Label>Profile Image</Label>
                                <img src={user && user.avatar && user.avatar.url} alt="avatar" className="h-auto sm:w-72 rounded-2xl" />
                            </div>
                            <div className="grid gap-2 w-full sm:w-72">
                                <Label>Resume</Label>
                                <img src={user && user.resume && user.resume.url} alt="resume" className="w-full h-auto sm:w-72 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;