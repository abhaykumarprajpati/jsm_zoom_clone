'use client'

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {

  StreamVideo,
  StreamVideoClient,

} from '@stream-io/video-react-sdk';
import { ReactNode, useState, useEffect } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = 'user-id';
// const token = 'authentication-token';
// const user: User = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', 'my-first-call');
// call.join({ create: true });

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

  const [videoClient, setvideoClient] = useState<StreamVideoClient>();

  const { user, isLoaded } = useUser();

  // we will create a new stream user of course we need it to start its own meeting 
  // room but we are going to create that stream user directly from our  currently logged in 
  // clerk user here is how 

  useEffect(() => {

    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error('Stream Api key Missing')

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl
      },
      tokenProvider
    })

    setvideoClient(client)


  }, [user, isLoaded])


  if(!videoClient) return <Loader/>

  return (
    <StreamVideo client={videoClient}>

      {children}

    </StreamVideo>
  );
};

export default StreamVideoProvider;

