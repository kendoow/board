import  "./Modal.scss";

const Modal = ({ active, children }) => {
  return (
    <div
      className={active ? 'active' : 'modal'}
    >
      <div className='modalContent' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;