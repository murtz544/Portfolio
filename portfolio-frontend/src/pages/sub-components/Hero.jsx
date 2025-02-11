import axios from "axios";
import React, { useEffect, useState } from "react";

const Hero = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getMyProfile = async () => {
            const { data } = await axios.get("http://localhost:4000/api/v1/user/me", { withCredentials: true });
            setUser(data.user);
        };
        getMyProfile();
    });
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-400 rounded-full h-2 w-2"></span>
                <p>Online</p>
            </div>
            <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
                Hey, I'm {user.fullName}
            </h1>
        </div>
    )
}

export default Hero;