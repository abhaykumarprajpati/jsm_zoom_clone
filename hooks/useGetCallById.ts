import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"



export const useGetCallById = (id: string | string[]) => {


    const [call, setCall] = useState<Call>()

    const [isCallLoading, setIsCallLoading] = useState(true)

    //next we get access to our stream video client

    const client = useStreamVideoClient();


    // now we use useeffect so that we start fetching our currently call

    useEffect(() => {

        if (!client) return;

        const loadCall = async () => {

            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })

            if (calls.length > 0) setCall(calls[0])

            setIsCallLoading(false)

        }

        loadCall();

    }, [])

    // we gonna recall useeffect whenever client or id of the caller trying to fetch changes


    return {  call , isCallLoading}



}