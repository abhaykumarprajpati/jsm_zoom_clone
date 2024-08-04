import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls =()=>{
    const [calls, setcalls] = useState<Call[]>([]);
    const [isLoading,setIsLoading]=useState(false);
    //now fetch calls
    const client = useStreamVideoClient();
    //now we have to fetch calls for specific user
    const {user} = useUser();

    useEffect(() => {

        const loadCalls = async()=>{

            if(!client || !user?.id) return;

            setIsLoading(true);

            try {

                const {calls} = await client.queryCalls({
                    sort:[{field:'starts_at',direction:-1}],
                    filter_conditions:{
                        starts_at:{$exists:true},
                        $or:[
                            {created_by_user_id:user.id},
                            {members:{$in:[user.id]}}
                        ]
                    }
                })
                setcalls(calls);
                
            } catch (error) {
                console.log("error:",error)
                
            }finally{
                setIsLoading(false)
            }

        }

        loadCalls();
     
    }, [client , user?.id])


    const now = new Date();


    const endedCalls = calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })
    const upcomingCalls = calls.filter(({state:{startsAt}}:Call)=>{

        return startsAt && new Date(startsAt) > now

    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading
    }
    
}