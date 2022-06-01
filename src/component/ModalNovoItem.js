import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';

const ModalNovoItem = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Novo Item</h4>
        </div>
        <div className="modal-body-Novoitem">
          <p>Nome:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname" name="fname" />
          <p>Descricao:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname" name="fname" />
          <p>Preco:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname" name="fname" />
          <p>Quantidade em estoque inicial:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname" name="fname" />
        </div>
        <div className="modal-footer">
          <button>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoItem;
