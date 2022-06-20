import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';

const ModalDetalhe = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{props.descricao.name}</h3>
        </div>
        <div className="modal-body-desc">
          <div>
            <span className="modal-desc-txt">{props.descricao.description}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              props.deleteCallBack(props.descricao.id);
              props.onClose();
            }}
          >
            Deletar Produto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhe;
