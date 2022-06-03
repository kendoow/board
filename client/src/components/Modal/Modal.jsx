import  "./Modal.scss";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div className='modalContent' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;