// We instance the Ably library outside the component so it is only created once and limit usage
import Ably from "ably/promises";
import { useEffect, useState } from 'react'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

// this is equivalent channel.get but for a hook
export function UseChannel(channelName, callbackOnMessage, rewind = false) {
    const rewindParam = "[?rewind=1]";
    const getChannel = rewind ? rewindParam + channelName : channelName;
    const channel = ably.channels.get(getChannel);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook);

    return [channel, ably];
};

// hook that returns the last message from the channel
export function ReadLastAblyMessage(channelName, callbackOnMessage) {
    const [synced, setSynced] = useState(false);

    const [statusChannel, ably] = UseChannel(channelName, async (message) => {

         if (!synced) {
            setSynced(true);
            await callbackOnMessage(message);
        }
    }, true);

    return [statusChannel, ably];
};
