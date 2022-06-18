import trash from '../public/images/trashIcon.png';
import '../styles/styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ModalWithdrawal from './component/ModalWithdrawal';
import ModalDetalhes from './component/ModalDetalhes';
import ModalCategoria from './component/ModalCategorias';
import ModalNovoItem from './component/ModalNovoItem';
import ModalStorageCtrl from './component/ModalStorageCtrl';
import ModalDeleteProduct from './component/ModalDeleteProduct';
import ModalConfirmDelete from './component/ModalConfirmDelete';
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
  const [modalDeleteProductVisibility, setModalDeleteProductVisibility] = useState(false);
  const [modalConfirmDeleteVisibility, setModalConfirmDeleteVisibility] = useState(false);
  const [selectedItens, setSelectedItens] = useState([]);
  const [lowStorageItens, setLowStorageItens] = useState([]);
  const [retirada, setRetirada] = useState(false);
  const [deleteCat, setDeleteCat] = useState(false);

  //var deleteCat;

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
    newLowStorageAlert.lowStorageAlert = Number(newValue);
    setProdutos(newLowStorageAlert);
    setAlertThreshold(Number(newValue));
  }

  function deleteSelected() {
    var prod = produtos;
    var selected = selectedItens;
    var ids = [];

    selected.forEach(iten => ids.push(iten.id));

    var newCats = prod.category.map(cats => {
      cats.itens = cats.itens.filter(ele => {
        var allow = true;
        ids.forEach(id => {
          if (ele.id == id) {
            allow = false;
          }
        });
        return allow;
      });
      return cats;
    });
    prod.category = newCats;
    setProdutos(Object.create(prod));
    unselectAll();
    handleSaveData();
  }

  function deleteCategory() {
    var prod = produtos;
    console.log(deleteCat);
    var newCats = prod.category.filter(cats => {
      return cats.nameCat != deleteCat;
    });
    prod.category = newCats;
    setProdutos(Object.create(prod));
    handleSaveData();
  }

  function unselectAll() {
    setSelectedItens([]);
    var checkboxes = document.getElementsByName('checkbox');
    for (var checkbox of checkboxes) {
      checkbox.checked = false;
    }
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
          <button onClick={() => setModalCategoriaVisibility(true)}>Categorias</button>
          <button onClick={() => setmodalNovoItemVisibility(true)}>Adicionar Produto</button>
          <button onClick={() => setModalDeleteProductVisibility(true)}>Remover Produto</button>
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
                  <span className="name-cat-txt">{produto.nameCat}</span>
                  <div
                    className="icon-trash-container"
                    onClick={() => {
                      //deleteCat = produto.nameCat;
                      setDeleteCat(produto.nameCat);
                      setModalConfirmDeleteVisibility(true);
                      //deleteCategory();
                    }}
                  >
                    <img className="icon-trash-img" src={trash}></img>
                  </div>
                </div>
                {produto.itens.map((iten, key2) => (
                  <div key={key2} className="cards">
                    <div className="imgInptContainer">
                      <input
                        type="checkbox"
                        name="checkbox"
                        onChange={value => {
                          //checked = value.target.checked;
                          prepareSelected(iten.id, value.target.checked);
                        }}
                      />
                      <div className="imgContainer">
                        <img className="productImg" src={iten.img} alt="logo" />
                      </div>
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
        <div style={{ display: 'flex' }}>
          <button
            className="retiradaBtn"
            onClick={() => {
              setModalWithdrawalVisibility(true);
              setRetirada(false);
            }}
          >
            Registrar Adição
          </button>
          <button
            className="retiradaBtn"
            onClick={() => {
              setModalWithdrawalVisibility(true);
              setRetirada(true);
            }}
          >
            Registrar Retirada
          </button>
        </div>
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

      <ModalNovoItem
        show={modalNovoItemVisibility}
        onClose={() => {
          setmodalNovoItemVisibility(false);
          storageMonitor();
        }}
        produtos={produtos}
      />

      <ModalWithdrawal
        show={modalWithdrawalVisibility}
        onClose={() => {
          setModalWithdrawalVisibility(false);
          storageMonitor();
          handleSaveData();
          unselectAll();
        }}
        itens={selectedItens}
        retirada={retirada}
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

      <ModalDeleteProduct show={modalDeleteProductVisibility} onClose={() => setModalDeleteProductVisibility(false)} itens={selectedItens} deleteSelectedCallBack={() => deleteSelected()} />

      <ModalConfirmDelete show={modalConfirmDeleteVisibility} onClose={() => setModalConfirmDeleteVisibility(false)} deleteCat={deleteCat} deleteCallBack={() => deleteCategory()} />
    </div>
  );
}
