import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryContainer } from './ImageGallery.styled';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images, handleClickImage }) => {
  return (
    <ImageGalleryContainer>
      {images.map(image => (
        <ImageGalleryItem
          key={nanoid()}
          {...image}
          handleClickImage={handleClickImage}
        />
      ))}
    </ImageGalleryContainer>
  );
};

export default ImageGallery;
