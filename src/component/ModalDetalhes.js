import React from "react";
import "../../styles/modal.css";
import "../../styles/styles.css";
import logo from "../../public/images/logo.svg";

const produtos = [
  {
    name: "Teste",
    quant: 10,
    value: "200",
    desc: "Descricao teste",
  },
  {
    name: "Cadeira",
    quant: 30,
    value: "1000",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
  {
    name: "Mesa",
    quant: 340,
    value: "500",
    desc: "Descricao teste",
  },
];

const ModalAddItem = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Detalhes do Produto</h4>
        </div>
        <div className="modal-body">
          <p>{produto.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalAddItem;
