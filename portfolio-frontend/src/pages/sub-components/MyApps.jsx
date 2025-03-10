import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
    const [applications, setApplication] = useState();

    useEffect(() => {
        const getMyApplications = async () => {
            const { data } = await axios.get("https://portfolio-backend-code-kwdg.onrender.com/api/v1/softwareapplication/getall", { withCredentials: true });
            setApplication(data.softwareApplications);
        };
        getMyApplications();
    }, []);
    return (
        <div className="w-full flex flex-col gap-8 sm:gap-12">
            <h1 className="text-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
                <span className="text-tubeLight-effect">MY APPS</span>
            </h1>
            <div></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                    applications && applications.map(element => {
                        return(
                            <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                                <img src={element.svg && element.svg.url} alt={element.name} className="h-12 sm:h-24 w-auto" />
                                <p className="text-muted-foreground text-center">{element.name}</p>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyApps;