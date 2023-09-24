import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onShowImage }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.filename}
          image={image}
          onShowImage={onShowImage}
        />
      ))}
    </Gallery>
  );
};
