import React from 'react';
import { Box, Button } from '@material-ui/core';
import Fish from './Fish';
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share"

function FishyContent(props: any){

    let fish = props.fish;

    let fishElement = <Fish colour={fish.colour} eye={fish.eye} key={"main-fish"} />

    return(
        <Box>
            {fishElement}

            <h3>
                {fish.title}
            </h3>

            <div className="social">
                <EmailShareButton children={<EmailIcon/>} url={window.location.href} />
                <RedditShareButton children={<RedditIcon/>} url={window.location.href} />
                <LineShareButton children={<LineIcon/>} url={window.location.href} />
            </div>

            <p>
                <small>
                    {getDate(fish.created)}
                </small>
            </p>

            <p>
                {fish.item}
            </p>
        </Box>
    )
}

function getDate(str: string){
    let split = str.split('T');
    return split[0] + " " + split[1];
}

export default FishyContent;