import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onShowImage }) => {
  const { small, description } = image;
  return (
    <GalleryItem>
      <img
        className="image"
        src={small}
        alt={description}
        onClick={() => onShowImage(image)}
      />
    </GalleryItem>
  );
};
