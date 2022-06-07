import logo from '../public/images/logo.svg';
import '../styles/styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ModalWithdrawal from './component/ModalWithdrawal';
import ModalDetalhes from './component/ModalDetalhes';
import ModalCategoria from './component/ModalCategorias';
import ModalNovoItem from './component/ModalNovoItem';
import ModalStorageCtrl from './component/ModalStorageCtrl';
import ReactToPrint from 'react-to-print';

export default function Home() {
  const [produtos, setProdutos] = useState(null);

  const [alertThreshold, setAlertThreshold] = useState(0);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [modalWithdrawalVisibility, setModalWithdrawalVisibility] = useState(false);
  const [modalCategoriaVisibility, setModalCategoriaVisibility] = useState(false);
  const [modalDetalhesVisibility, setDescricaoVisibility] = useState(false);
  const [modalDescContent, setmodalDescContent] = useState(null);
  const [modalNovoItemVisibility, setmodalNovoItemVisibility] = useState(false);
  const [modalStorageAlertVisibility, setModalStorageAlertVisibility] = useState(false);
  const [selectedItens, setSelectedItens] = useState([]);
  const [lowStorageItens, setLowStorageItens] = useState([]);

  function prepareSelected(id, value) {
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

    setSelectedItens(localSelectedItens);
  }

  function storageMonitor() {
    let prod = produtos;
    let localLowStorageItens = [];
    if (prod != null) {
      prod.category.forEach(cats => {
        cats.itens.forEach(iten => {
          if (iten.quant <= produtos.lowStorageAlert) {
            localLowStorageItens.push(iten);
            setAlertVisibility(true);
          }
        });
      });
      if (localLowStorageItens.length == 0) {
        setAlertVisibility(false);
      }
      setLowStorageItens(localLowStorageItens);
    }
  }

  function setNewAlertThreshold(newValue) {
    var newLowStorageAlert = produtos;
    newLowStorageAlert.lowStorageAlert = newValue;
    setProdutos(newLowStorageAlert);
    setAlertThreshold(newValue);
  }

  async function handleLoadData() {
    const result = await Api.readData();
    if (Object.keys(result).length === 0) {
      setProdutos(null);
    } else {
      setProdutos(result);
      setAlertThreshold(result.lowStorageAlert);
    }
  }

  async function handleSaveData() {
    const result = await Api.saveData(produtos);
    console.log('Retorno da Api: ' + result);
  }

  useEffect(() => {
    storageMonitor();
  }, [produtos]);

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
          <button onClick={() => setModalCategoriaVisibility(true)}>Categorias</button>
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
        {produtos != null ? (
          produtos.category.length != 0 ? (
            produtos.category.map((produto, key1) => (
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
          ) : (
            <div className="no-alert">
              <span>Nenhum item cadastrado</span>
            </div>
          )
        ) : null}
      </div>

      <div className="retiradaBtnContainer categorys">
        <div className="printContainer">
          <ReactToPrint content={() => document.getElementById('pdf')} trigger={() => <button className="btn-primary">Gerar relatorio</button>} />
        </div>
        <button className="retiradaBtn" onClick={() => setModalWithdrawalVisibility(true)}>
          Registrar Retirada
        </button>
      </div>

      {alertVisibility ? (
        <div
          className="alert-home"
          onClick={() => {
            setModalStorageAlertVisibility(true);
          }}
        >
          <span className="alert-home-text">Alerta de estoque baixo</span>
        </div>
      ) : (
        <div
          className="alert-home-close"
          onClick={() => {
            setModalStorageAlertVisibility(true);
          }}
        >
          <span className="alert-home-text">Alertas</span>
        </div>
      )}

      <ModalNovoItem show={modalNovoItemVisibility} onClose={() => setmodalNovoItemVisibility(false)} produtos={produtos} />

      <ModalWithdrawal
        show={modalWithdrawalVisibility}
        onClose={() => {
          setModalWithdrawalVisibility(false);
          storageMonitor();
          handleSaveData();
        }}
        itens={selectedItens}
      />

      <ModalDetalhes show={modalDetalhesVisibility} onClose={() => setDescricaoVisibility(false)} descricao={modalDescContent} />

      <ModalCategoria show={modalCategoriaVisibility} onClose={() => setModalCategoriaVisibility(false)} produtos={produtos} />

      <ModalStorageCtrl
        show={modalStorageAlertVisibility}
        onClose={() => setModalStorageAlertVisibility(false)}
        lowStorageItens={lowStorageItens}
        alertThreshold={alertThreshold}
        setNewAlertThresholdCallBack={value => {
          setNewAlertThreshold(value);
          storageMonitor();
          handleSaveData();
        }}
      />
    </div>
  );
}
