import React from "react";
import "../../styles/modal.css";
import "../../styles/styles.css";
import logo from "../../public/images/logo.svg";

const produtos = [
  {
    name: "Teste",
    quant: 10,
    value: "200",
  },
  {
    name: "Cadeira",
    quant: 30,
    value: "1000",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
  },
];

const ModalCategoria = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Nova Categoria</h4>
        </div>
        <div className="modalscr-body">
          <p>Nome:</p>
          <input className="searchBar" type="text" id="fname" name="fname" />
        </div>
        <div className="modal-footer">
          <button>Registrar Retirada</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoria;
