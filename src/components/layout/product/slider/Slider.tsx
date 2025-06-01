import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import 'swiper/swiper-bundle.css';

interface Image {
  src: string;
  alt: string;
}

interface SliderProps {
  readonly images: Image[];
}
export function Slider({ images }: SliderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      const preventTouchMove = (e: TouchEvent) => {
        if (e.target instanceof Node && document.querySelector(`.${styles.modalWindow}`)?.contains(e.target)) {
          return;
        }
        e.preventDefault();
      };

      window.addEventListener('touchmove', preventTouchMove, { passive: false });

      return () => {
        const scrollYRestored = parseInt(document.body.style.top || '0', 10) * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollYRestored);
        window.removeEventListener('touchmove', preventTouchMove);
      };
    }
  }, [isModalOpen]);

  function handleImageClick(index: number) {
    setImageIndex(index);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.container}>
      <Swiper navigation={false} pagination={{ clickable: true }}>
        {images.map((image, index) => (
          <SwiperSlide key={`${image}${index}`}>
            <img
              src={image.src}
              alt={image.alt}
              className={styles.image}
              onClick={() => handleImageClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && (
        <div className={styles.modalWindow}>
          <div className={styles.modal}>
            <button
              className={styles.buttonCloseModal}
              onClick={handleCloseModal}
            >
              X
            </button>
            <div className={styles.modalSlider}>
              <img
                src={images[imageIndex].src}
                alt={images[imageIndex].alt}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.arrowsContainer}>
              <button
                className={styles.arrow}
                onClick={handlePrevImage}
                disabled={images.length === 1}
              >
                ⭠
              </button>
              <button
                className={styles.arrow}
                onClick={handleNextImage}
                disabled={images.length === 1}
              >
                ⭢
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
