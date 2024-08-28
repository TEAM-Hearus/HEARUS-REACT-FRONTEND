import { useEffect, useState } from 'react';
import myScript from '../../../../assets/images/landing/landing-myscript.png';
import caption from '../../../../assets/images/landing/landing-caption.png';
import detail from '../../../../assets/images/landing/landing-detail.png';
import styles from './ImageCarousel.module.scss';

const images = [detail, myScript, caption, detail, myScript];
const FIRST_IMAGE_INDEX = 1;
const LAST_IMAGE_INDEX = images.length - 2;

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(FIRST_IMAGE_INDEX);
  const [transition, setTransition] = useState(true);

  const next = () => {
    setTransition(true);
    setActiveIndex((prev) => prev + 1);

    const transitionEndTimer = setTimeout(() => {
      if (activeIndex === LAST_IMAGE_INDEX) {
        setTransition(false);
        setActiveIndex(FIRST_IMAGE_INDEX);
      }
    }, 2000);

    return () => clearTimeout(transitionEndTimer);
  };

  useEffect(() => {
    const slideInterval = setInterval(next, 3000);
    return () => clearInterval(slideInterval);
  }, [activeIndex]);

  return (
    <article className={styles.container}>
      <ul
        className={styles.ul}
        style={{
          transform: `translateX(calc(-${activeIndex - 1} * (50dvw + 50px)))`,
          transition: transition ? 'transform 2s ease' : 'none',
        }}
      >
        {images.map((img, index) => (
          <li key={index} className={styles.li}>
            <img className={styles.img} src={img} alt={`Image ${index + 1}`} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ImageCarousel;
