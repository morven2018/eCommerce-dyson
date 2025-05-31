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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleImageClick = (index: number) => {
    setImageIndex(index);
    setIsModalOpen(true);
  };

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
      <Swiper navigation={true} pagination={{ clickable: true }}>
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
