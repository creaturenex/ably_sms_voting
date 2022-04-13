import styles from './QuestionComponent.module.css';
import Image from 'next/image';

const QuestionComponent = ({ question }) => {

    const itemsForDisplay = question.options;

    const displayItems = itemsForDisplay.map(opt =>
        <li key={ opt.key } className={styles.answer}>
            <span className={styles.text}>{opt.text}</span>
            <Image className={styles.image} src={ '/' + opt.src } alt={ opt.text } width="300" height="300"/>
            <span className={styles.letter}>{ opt.key }</span>
        </li>
    );

    return (
    <>
        <h1 className={styles.question}>{ question.text }</h1>
        <ul className={styles.answers}>
            {displayItems}
        </ul>
    </>
    );
}

export default QuestionComponent;
