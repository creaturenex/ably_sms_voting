import React, { useEffect, useState } from 'react';
import { useChannel, readLastAblyMessage, leadingClientSends } from "./AblyReactEffect";
import styles from './ResultsComponent.module.css';
import { parseSms } from "./parseSms";

const ResultsComponent = ({ question }) => {
    // initial score set to zero
    const initialScores = {};
    question.options.map(x => x.key).forEach(i => initialScores[i] = 0);

    const [votes, setVotes] = useState(initialScores);

    // read last message and set votes so new clients are in sync with others
    const [statusChannel] = readLastAblyMessage("sms-notifications-votes", async (lastMessage) => {
        setVotes(lastMessage.data);
    });

    const [channel, ably] = useChannel("sms-notifications", async (message) => {
        const sms = parseSms(message);
        const value = sms.text.toUpperCase();

        const updatedVotes = { ...votes };
        updatedVotes[value]++;
        setVotes(updatedVotes);

        statusChannel.publish({ name: "voteSummary", data: updatedVotes });
    });

    // formatting the total votes for the screen
    const totalVotes = getTotalVotes(votes);
    const itemsForDisplay = decorateOptionsWithVotes(question.options, votes);

    const displayItems = itemsForDisplay.map(opt =>
        <li key={ opt.key } className={styles.vote} title={opt.text}>
            <span className={styles.number}>{ opt.votes }</span>
            <span className={styles.bar} style={{ height: opt.votePercentage}}></span>
        </li>
    );
    // create component and return it
    return (
    <>
        <ul className={styles.votes}>
            {displayItems}
        </ul>
        <div className={styles.total}>Total votes: <b>{totalVotes}</b></div>
    </>
    );
}
// helper functions that cleans up data
function getTotalVotes(votes) {
    return Object.values(votes).reduce((a,b) => a+b);
}

function decorateOptionsWithVotes(options, votes) {
    const totalVotes = getTotalVotes(votes);
    const optionsWithVotes = [...options ];

    optionsWithVotes.forEach(option => {
        const voteCount = votes[option.key];
        const percent = totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100;
        option.votes = voteCount;
        option.votePercentage = Math.floor(percent) + "%";
    });

    return optionsWithVotes;
}

export default ResultsComponent;
