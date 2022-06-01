import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';
import { useState, useEffect } from 'react';

const initial = [
  { id: 0, name: 'Cadeira', quant: 30, value: 259.9, selectedQuant: 0 },
  { id: 1, name: 'Mesa', quant: 60, value: 259.9, selectedQuant: 0 },
  { id: 2, name: 'Sofá', quant: 90, value: 259.9, selectedQuant: 0 },
];

const ModalAddItem = props => {
  const [produtos, setProdutos] = useState(initial);

  async function increment(id) {
    var produtosIncrement = produtos;
    produtosIncrement.forEach(item => {
      if (item.id == id) {
        if (item.quant > item.selectedQuant) {
          item.selectedQuant = item.selectedQuant + 1;
        }
      }
    });
    setProdutos(null);
    setProdutos(Object.create(produtosIncrement));
  }

  async function decrement(id) {
    var produtosDecrement = produtos;
    produtosDecrement.forEach(item => {
      if (item.id == id) {
        if (item.selectedQuant > 0) {
          item.selectedQuant = item.selectedQuant - 1;
        }
      }
    });
    setProdutos(null);
    setProdutos(Object.create(produtosDecrement));
  }

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Lista de retirada</h4>
        </div>
        <div className="modal-body">
          <div className="cardsContainerAdd">
            {produtos.map((produto, key) => (
              <div key={key} className="cards">
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
                  <button onClick={() => decrement(produto.id)}>-</button>
                </div>
                <div className="numberContainer">
                  <span>{produto.selectedQuant}</span>
                </div>
                <div className="addContainer">
                  <button
                    onClick={() => {
                      increment(produto.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button>Registrar Retirada</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddItem;
