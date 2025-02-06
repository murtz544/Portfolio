import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);
    const { projects } = useSelector((state) => state.project);
    const { skills } = useSelector((state) => state.skill);
    return (
        <>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
                    <div className="grid auto-rows-mac items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-2">
                                <CardHeader className="pb-3">
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        {user.aboutMe}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link to={user.portfolioURL && user.portfolioURL}>
                                        <Button>Visit Portfolio</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="flex flex-col justify-center">
                                <CardHeader className="pb-2">
                                    <CardTitle>Projects Completed</CardTitle>
                                    <CardTitle className="text-6xl">{projects && projects.length}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Link to={"/manage/projects"}>
                                        <Button>Manage Projects</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="flex flex-col justify-center">
                                <CardHeader className="pb-2">
                                    <CardTitle>Skills</CardTitle>
                                    <CardTitle className="text-6xl">{skills && skills.length}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Link to={"/manage/skills"}>
                                        <Button>Manage Skills</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs>
                            <TabsContent>
                                <Card>
                                    <CardHeader className="px-7">
                                        <CardTitle>Projects</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead className="hidden md:table-cell">Stack</TableHead>
                                                    <TableHead className="hidden md:table-cell">Deployed</TableHead>
                                                    <TableHead className="md:table-cell">Update</TableHead>
                                                    <TableHead className="text-right">Visit</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dashboard;