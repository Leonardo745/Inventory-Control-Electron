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
];

const ModalAddItem = (props) => {
  if (!props.show) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Lista de retirada</h4>
          </div>
          <div className="modal-body">
            {produtos.map((produto, key)=> ( 
               <div className="cards">
               <div className="imgInptContainer">
                 <img className="productImg" src={logo} alt="logo" />
               </div>
               <div className="nomeContainer">
                 <div>
                   <span className="teste">{produto.name}</span>
                 </div>
                 <div>
                   <span>Quantidade em Estoque: </span>
                   <span>{produto.quant}</span>
                 </div>
                 <div>
                   <span>Preço: </span>
                   <span>R$ {produto.value}</span>
                 </div>
               </div>
               <div className="subtractContainer">
                 <button>-</button> 
               </div>
               <div className="numberContainer">
               <span>3</span>
               </div>
               <div className="addContainer">
                 <button>+</button>
               </div>
             </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="button">Registrar Retirada</button>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalAddItem;
