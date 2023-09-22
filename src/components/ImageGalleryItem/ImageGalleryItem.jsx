export const ImageGalleryItem = ({ image: { small, description } }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={small} alt={description} />
    </li>
  );
};
