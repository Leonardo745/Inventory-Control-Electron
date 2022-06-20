import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import defaultProductImg from '../../public/images/defaultProduct.png';
import { useState, useEffect } from 'react';

const ModalDeleteProduct = props => {
  const [produtos, setProdutos] = useState([]);

  async function deleteProduct() {
    props.deleteSelectedCallBack();
  }

  function handleClickConfirm() {
    deleteProduct();
    closeModal();
  }

  function closeModal() {
    var prod = produtos;
    prod.forEach(item => {
      item.selectedQuant = 0;
    });

    props.onClose();
  }

  useEffect(() => {
    setProdutos(props.itens);
  }, [props.itens]);

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Lista de Remoção</h4>
        </div>
        <div className="modal-body">
          <div className="cardsContainerAdd">
            {produtos.length != 0 ? (
              produtos.map((produto, key) => (
                <div key={key} className="cards">
                  <div className="imgInptContainer">
                    <div className="imgContainer">
                      <img className="productImg" src={produto.img == null ? defaultProductImg : produto.img} alt="logo" />
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
                <span>Nenhum item selecionado</span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">{produtos.length != 0 ? <button onClick={handleClickConfirm}>Deletar Produtos</button> : null}</div>
      </div>
    </div>
  );
};

export default ModalDeleteProduct;
