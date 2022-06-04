import logo from '../public/images/logo.svg';
import '../styles/styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ModalWithdrawal from './component/ModalWithdrawal';
import ModalDetalhes from './component/ModalDetalhes';
import ModalCategoria from './component/ModalCategorias';
import ModalNovoItem from './component/ModalNovoItem';
import ReactToPrint from 'react-to-print';

export default function Home() {
  const [produtos, setProdutos] = useState(null);

  const [modalWithdrawalVisibility, setModalWithdrawalVisibility] = useState(false);
  const [modalCategoriaVisibility, setModalCategoriaVisibility] = useState(false);
  const [modalDetalhesVisibility, setDescricaoVisibility] = useState(false);
  const [modalDescContent, setmodalDescContent] = useState(null);
  const [modalNovoItemVisibility, setmodalNovoItemVisibility] = useState(false);
  const [selectedItens, setSelectedItens] = useState([]);

  async function prepareSelected(id, value) {
    let prod = produtos;
    var localSelectedItens = selectedItens;
    if (value) {
      prod.category.forEach((cats, key) => {
        cats.itens.forEach(iten => {
          if (iten.id == id) {
            if (value) {
              localSelectedItens.push(iten);
            }
          }
        });
      });
    } else {
      localSelectedItens = localSelectedItens.filter(ele => {
        return ele.id != id;
      });
    }

    console.log(localSelectedItens);
    setSelectedItens(localSelectedItens);
  }

  async function handleLoadData() {
    const result = await Api.readData();
    if (Object.keys(result).length === 0) {
      setProdutos(null);
    } else {
      setProdutos(result);
    }
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="searchBarContainer">
          <input className="searchBar" type="text" id="fname" name="fname" />
        </div>
        <div className="headerBtnContainer">
          <button onClick={() => setmodalNovoItemVisibility(true)}>Adicionar Produto</button>
          <button onClick={() => setModalCategoriaVisibility(true)}>Adicionar Categoria</button>
        </div>
      </div>

      <div className="categorys">
        <button>Todos</button>
        {produtos != null
          ? produtos.category.map((category, key) => (
              <div key={key}>
                <button>{category.nameCat}</button>
              </div>
            ))
          : null}
      </div>
      <div className="cardsContainer" id="pdf">
        {produtos != null
          ? produtos.category.map((produto, key1) => (
              <div key={key1}>
                <div className="categoryDivisor">
                  <span>{produto.nameCat}</span>
                </div>
                {produto.itens.map((iten, key2) => (
                  <div key={key2} className="cards">
                    <div className="imgInptContainer">
                      <input
                        type="checkbox"
                        onChange={value => {
                          prepareSelected(iten.id, value.target.checked);
                        }}
                      />
                      <img className="productImg" src={logo} alt="logo" />
                    </div>
                    <div className="nomeContainer">
                      <div>
                        <span className="teste">{iten.name}</span>
                      </div>
                      <div>
                        <span>Quantidade em Estoque: </span>
                        <span>{iten.quant}</span>
                      </div>
                      <div>
                        <span>Preço: </span>
                        <span>R$ {iten.value}</span>
                      </div>
                    </div>
                    <div className="descripContainer">
                      <button
                        className="buttonDesc"
                        onClick={() => {
                          setDescricaoVisibility(true);
                          setmodalDescContent(iten);
                        }}
                      >
                        Descrição
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>

      <div className="retiradaBtnContainer categorys">
        <div className="printContainer">
          <ReactToPrint content={() => document.getElementById('pdf')} trigger={() => <button className="btn-primary">Print to PDF!</button>} />
        </div>
        <button className="retiradaBtn" onClick={() => setModalWithdrawalVisibility(true)}>
          Registrar Retirada
        </button>
      </div>

      <ModalNovoItem show={modalNovoItemVisibility} onClose={() => setmodalNovoItemVisibility(false)} produtos={produtos} />

      <ModalWithdrawal show={modalWithdrawalVisibility} onClose={() => setModalWithdrawalVisibility(false)} itens={selectedItens} />

      <ModalDetalhes show={modalDetalhesVisibility} onClose={() => setDescricaoVisibility(false)} descricao={modalDescContent} />

      <ModalCategoria show={modalCategoriaVisibility} onClose={() => setModalCategoriaVisibility(false)} produtos={produtos} />
    </div>
  );
}
