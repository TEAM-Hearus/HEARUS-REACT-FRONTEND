import example from '../../../../assets/images/landing/landing-myscript.jpg';
import styles from './ImageCarousel.module.scss';

const ImageCarousel = () => {
  return (
    <article>
      <img
        className={styles.exampleImg}
        src={example}
        alt="recent script page example"
      />
    </article>
  );
};

export default ImageCarousel;
