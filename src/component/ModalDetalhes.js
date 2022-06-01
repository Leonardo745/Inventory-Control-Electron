import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';

const ModalDetalhe = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Detalhes do Produto</h3>
        </div>
        <div className="modal-body-desc">
          <div>
            <span className="modal-name-txt">{props.descricao.name}</span>
          </div>
          <div>
            <span className="modal-desc-txt">{props.descricao.descricao}</span>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default ModalDetalhe;
