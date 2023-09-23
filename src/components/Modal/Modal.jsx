export const Modal = ({ currentImage, closeModal }) => {
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={currentImage} alt="" />
      </div>
    </div>
  );
};
