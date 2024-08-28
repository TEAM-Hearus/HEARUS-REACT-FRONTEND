import { useEffect, useState } from 'react';
import { SCROLLING_TEXTS } from '../../../../constants/landing';
import styles from './TextCarousel.module.scss';

const TextCarousel = () => {
  const FIRST_TEXT_INDEX = 2;
  const LAST_TEXT_INDEX = SCROLLING_TEXTS.length - 3;

  const [activeIndex, setActiveIndex] = useState(FIRST_TEXT_INDEX);
  const [transition, setTransition] = useState(true);

  const next = () => {
    setTransition(true);
    setActiveIndex((prev) => prev + 1);

    const transitionEndTimer = setTimeout(() => {
      if (activeIndex === LAST_TEXT_INDEX) {
        setTransition(false);
        setActiveIndex(FIRST_TEXT_INDEX);
      }
    }, 300);

    return () => clearTimeout(transitionEndTimer);
  };

  useEffect(() => {
    const slideInterval = setInterval(next, 3000);
    return () => clearInterval(slideInterval);
  }, [next]);
  return (
    <article className={styles.container}>
      <ul
        className={styles.ul}
        style={{
          transform: `translateY(-${(activeIndex - 1) * 55}px)`,
          transition: transition ? 'transform 0.3s ease' : 'none',
        }}
      >
        {SCROLLING_TEXTS.map((text, index) => (
          <li
            key={index}
            className={index === activeIndex ? styles.active : styles.inactive}
          >
            {text}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default TextCarousel;
