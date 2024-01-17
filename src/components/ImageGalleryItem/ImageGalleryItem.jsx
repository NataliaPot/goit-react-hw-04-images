import {
  ImageGalleryItemContainer,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  handleClickImage,
}) => {
  const image = { webformatURL, tags, largeImageURL };

  return (
    <ImageGalleryItemContainer>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => handleClickImage(image)}
      />
    </ImageGalleryItemContainer>
  );
};
export default ImageGalleryItem;
