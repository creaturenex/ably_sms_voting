import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

import QuestionsComponent from "../components/QuestionComponent";
const ResultsComponent = dynamic(() => import('../components/ResultsComponent'), { ssr: false });

export default function Home() {

  const question = getQuestion();

  return (
    <div className={styles.container}>
      <Head>
        <title>Romero Ably Voting</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ablyrealtime" />
        <meta name="twitter:creator" content="@creaturenex" />
        <meta property="og:url" content="https://omr-ably-sms-voting.vercel.app/" />
        <meta property="og:title" content="Which cookie is the best?" />
        <meta property="og:description" content="Text A, B, C or D to vote!" />
        <meta property="og:image" content="https://sms-vote.vercel.app/images/tw.png" />
      </Head>
      <main className={styles.main} style={{ background: "linear-gradient(#FF5516, #E40000)" }}>
      <header className={styles.header}>
        <Image src="/smsvote.svg" alt="sms vote" className={styles.logo} width="300" height="300"/>
        <h1 className={styles.title}>Text: (+1)8882635045<br />to vote</h1>
      </header>
        <QuestionsComponent question={question} />
        <ResultsComponent question={question} />
      </main>

      <footer className={styles.footer}style={{ background: "linear-gradient(#E40000, #FF5516)" }}>
        <p className={styles.powered}>Powered by</p>
        <a className={styles.vercel} href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">Vercel</a>
          <span className={styles.plus}>+</span>
        <a className={styles.vonage} href="https://www.vonage.co.uk/" target="_blank" rel="noopener noreferrer">
          Vonage
        </a>
          <span className={styles.plus}>+</span>
        <a className={styles.ably} href="https://ably.com/" target="_blank" rel="noopener noreferrer">
          Ably
        </a>
        <a className={styles.github} href="https://github.com/ably-labs/vonage-vercel-voting">Fork it on Github</a>
      </footer>
    </div>
  )
}


function getQuestion() {
  return {
    text: "Which cookie is the best?",
    options: [
        { key: "A", text: "Jammy Dodger", votes: 0, src: "images/jamiedodger.jpg" },
        { key: "B", text: "Oreo", votes: 0, src: "images/oreo.jpg" },
        { key: "C", text: "Bourbon", votes: 0, src: "images/bourbon.jpg" },
        { key: "D", text: "Custard cream", votes: 0, src: "images/custardcream.jpg" }
    ]
  };
}
