import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';
import { useState, useEffect } from 'react';

const ModalStorageCtrl = props => {
  const [produtos, setProdutos] = useState([]);
  const [alertThreshold, setAlertThreshold] = useState(0);

  useEffect(() => {
    setProdutos(props.lowStorageItens);
    setAlertThreshold(props.alertThreshold);
  }, [props.lowStorageItens, props.alertThreshold]);

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Alertas de Armazenamento</h4>
        </div>
        <div className="modal-body">
          <div className="cardsContainerAdd">
            {produtos.length != 0 ? (
              produtos.map((produto, key) => (
                <div key={key} className="cards color-alert">
                  <div className="imgInptContainer">
                    <div className="imgContainer">
                      <img className="productImg" src={produto.img} alt="logo" />
                    </div>
                  </div>
                  <div className="nomeContainer">
                    <div>
                      <span>{produto.name}</span>
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
                </div>
              ))
            ) : (
              <div className="no-alert">
                <span>Sem novos Alertas</span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <span className="alert-min-span">Mudar quantidade minima para Alerta: </span>
          <input
            className="input-alertThreshold"
            value={alertThreshold}
            type="number"
            onChange={e => {
              setAlertThreshold(Number(e.target.value));
              props.setNewAlertThresholdCallBack(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalStorageCtrl;
