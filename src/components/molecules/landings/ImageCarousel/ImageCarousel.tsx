import myScript from '../../../../assets/images/landing/landing-myscript.png';
import caption from '../../../../assets/images/landing/landing-caption.png';
import detail from '../../../../assets/images/landing/landing-detail.png';
import styles from './ImageCarousel.module.scss';

const ImageCarousel = () => {
  return (
    <article className={styles.container}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <img
            className={styles.img}
            src={myScript}
            alt="recent script page example"
          />
        </li>
        <li className={styles.li}>
          <img
            className={styles.img}
            src={caption}
            alt="record caption page example"
          />
        </li>
        <li className={styles.li}>
          <img
            className={styles.img}
            src={detail}
            alt="script detail page example"
          />
        </li>
      </ul>
    </article>
  );
};

export default ImageCarousel;
