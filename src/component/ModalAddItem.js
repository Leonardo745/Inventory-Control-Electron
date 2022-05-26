import React from "react";
import "../../styles/modal.css";

const ModalAddItem = (props) => {
  if (!props.show) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Modal titulo</h4>
          </div>
          <div className="modal-body">conteudo do modal</div>
          <div className="modal-footer">
            <button className="button">Fechar</button>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalAddItem;
