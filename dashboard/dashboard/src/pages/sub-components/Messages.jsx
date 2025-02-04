import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const navigateTo = useNavigate();
    const handleReturnToDashboard = () => {
        navigateTo("/");
    };

    //const {} = useSelector(state => state.messages);

    const [messageId, setMessageId] = useState("");


    return (
        <>
            <div className="min-h-[100vh] sm:gap:4 sm:py-4 sm:pl-20">
                <Tabs>
                    <TabsContent>
                        <Card>
                            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                                <CardTitle>Messages</CardTitle>
                                <Button className="w-fit" onClick={handleReturnToDashboard}>
                                    Return to Dashboard
                                </Button>
                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-2 gap-4">
                                
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Messages;