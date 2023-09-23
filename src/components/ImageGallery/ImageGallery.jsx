import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onShowImage }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.filename}
          image={image}
          onShowImage={onShowImage}
        />
      ))}
    </ul>
  );
};
