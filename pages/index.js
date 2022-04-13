import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import QuestionsComponent from "../components/QuestionComponent";

const ResultsComponent = dynamic(() => import('../components/ResultsComponent'), { ssr: false });

export default function Home() {

    const question = getQuestion();

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <header className={styles.header}>
                    <img src="/images/smsvote.svg" alt="sms vote" className={styles.logo} />
                    <h1 className={styles.title}>Text: (+33) 644 63 42 09<br />to vote</h1>
                </header>
                <QuestionsComponent question={question} />
                <ResultsComponent question={question} />
            </main>

            <footer className={styles.footer}>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}

// hard-code this question here for now.

function getQuestion() {
    return {
        text: "Which biscuit is best?",
        options: [
            { key: "A", text: "Jammy Dodger", votes: 0, src: "images/jamiedodger.jpg" },
            { key: "B", text: "Oreo", votes: 0, src: "images/oreo.jpg" },
            { key: "C", text: "Bourbon", votes: 0, src: "images/bourbon.jpg" },
            { key: "D", text: "Custard cream", votes: 0, src: "images/custardcream.jpg" }
        ]
    };
}
