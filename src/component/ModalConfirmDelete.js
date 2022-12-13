import React, { useState, useEffect } from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';

const ModalConfirmDelete = props => {
  function callDeleteCat() {
    props.deleteCallBack();
    props.onClose();
  }

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Deletar Categoria</h3>
        </div>
        <div className="modal-body-delete">
          <div>
            <div>
              <span>Tem certeza que deseja deletar a categoria "{props.deleteCat}" e TODOS os seus itens ?</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span className="modal-delete-txt">Esta ação é irreversivel</span>
            </div>
          </div>
        </div>
        <div className="modal-footer-delete">
          <div style={{ display: 'flex' }}>
            <button className="btn-yep" onClick={callDeleteCat}>
              Sim
            </button>
            <button className="btn-noop" onClick={props.onClose}>
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
