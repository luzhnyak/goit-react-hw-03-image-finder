export const ImageGalleryItem = ({
  image: { small, description, large },
  onShowImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={small}
        alt={description}
        onClick={() => onShowImage(large)}
      />
    </li>
  );
};
