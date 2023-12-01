import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';

const FBChat = () => {
    return (
        <FacebookProvider appId="652320020381215" chatSupport>
            <CustomChat pageId="162747150261694" minimized={true} />
        </FacebookProvider>
    );
}

export default FBChat