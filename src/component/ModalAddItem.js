import React from "react";
import "../../styles/modal.css";
import "../../styles/styles.css";
import logo from "../../public/images/logo.svg";

const ModalAddItem = (props) => {
  if (!props.show) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Lista de retirada</h4>
          </div>
          <div className="modal-body">
          <div className="cards">
            <div className="imgInptContainer">
              <img className="productImg" src={logo} alt="logo" />
            </div>
            <div className="nomeContainer">
              <div>
                <span className="teste">cadeira</span>
              </div>
              <div>
                <span>Quantidade em Estoque: </span>
                <span>3</span>
              </div>
              <div>
                <span>Preço: </span>
                <span>R$75</span>
              </div>
            </div>
            <div className="addContainer">
              <button>+</button> 
            </div>
            <div className="numberContainer">
            <span>3</span>
            </div>
            <div className="subtractContainer">
              <button>-</button>
            </div>
          </div>
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
