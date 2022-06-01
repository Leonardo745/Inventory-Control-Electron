import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';

const ModalCategoria = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Nova Categoria</h4>
        </div>
        <div className="modal-body">
          <p>Nome:</p>
          <input className="searchBar modal-searchbar" type="text" id="fname" name="fname" />
        </div>
        <div className="modal-footer">
          <button>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoria;
