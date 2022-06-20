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
import defaultProduct from '../public/images/defaultProduct.png';
import Exportpdf from './component/Exportpdf';

export default function Home() {
  const [produtos, setProdutos] = useState(null);
  const [produtosDisplay, setProdutosDisplay] = useState(null);

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
  const [modalExportPdfVisibility, setModalExportPdfVisibility] = useState(false);
  const [selectedItens, setSelectedItens] = useState([]);
  const [lowStorageItens, setLowStorageItens] = useState([]);
  const [retirada, setRetirada] = useState(false);
  const [deleteCat, setDeleteCat] = useState(false);
  const [activeCatBtn, setActiveCatBtn] = useState(-1);
  //const componentRef = useRef();

  var searchInput = '';

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

  function deleteId(id) {
    var prod = produtos;

    var newCats = prod.category.map(cats => {
      cats.itens = cats.itens.filter(ele => {
        return ele.id != id;
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
    var newCats = prod.category.filter(cats => {
      return cats.nameCat != deleteCat;
    });
    prod.category = newCats;
    setProdutos(Object.create(prod));
    setActiveCatBtn(-1);
    filterCat(true, null);
    handleSaveData();
  }

  function unselectAll() {
    setSelectedItens([]);
    var checkboxes = document.getElementsByName('checkbox');
    for (var checkbox of checkboxes) {
      checkbox.checked = false;
    }
  }

  function filterCat(showAll, cat) {
    unselectAll();
    document.getElementById('searchBar').value = '';
    if (!showAll) {
      var newDisplay = Object.create(produtos);
      var fiteredCatsDisplay = newDisplay.category.filter(cats => {
        return cats.nameCat == cat;
      });
      newDisplay.category = fiteredCatsDisplay;
      setProdutosDisplay(Object.create(newDisplay));
    } else {
      setProdutosDisplay(Object.create(produtos));
    }
  }

  function filterProduct() {
    setActiveCatBtn(-2);
    unselectAll();
    if (searchInput != '') {
      var newDisplay = Object.create(produtos);
      var fiteredCatsDisplay = newDisplay.category.map(cats => {
        var newCats = {};
        newCats.nameCat = cats.nameCat;
        newCats.itens = cats.itens.filter(ele => {
          return ele.name.toUpperCase().includes(searchInput.toUpperCase());
        });
        return newCats;
      });

      newDisplay.category = fiteredCatsDisplay.filter(cats => {
        return cats.itens.length > 0;
      });

      setProdutosDisplay(Object.create(newDisplay));
    } else {
      setActiveCatBtn(-1);
      setProdutosDisplay(Object.create(produtos));
    }
  }

  async function handleLoadData() {
    const result = await Api.readData();
    if (Object.keys(result).length === 0) {
      setProdutos(null);
      setProdutosDisplay(null);
    } else {
      setProdutos(result);
      setProdutosDisplay(result);
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
          <input
            placeholder="Buscar Produto"
            className="searchBar"
            type="text"
            id="searchBar"
            onChange={e => {
              searchInput = e.target.value;
              filterProduct();
            }}
          />
        </div>
        <div className="headerBtnContainer">
          <button onClick={() => setModalCategoriaVisibility(true)}>Categorias</button>
          <button onClick={() => setmodalNovoItemVisibility(true)}>Adicionar Produto</button>
          <button onClick={() => setModalDeleteProductVisibility(true)}>Remover Selecionados</button>
        </div>
      </div>

      <div className="categorys">
        <button
          className={`base-class ${activeCatBtn == -1 ? 'active-color' : ''}`}
          onClick={() => {
            filterCat(true, null);
            setActiveCatBtn(-1);
          }}
        >
          Todos
        </button>
        {produtos != null
          ? produtos.category.map((category, key) => (
              <div key={key}>
                <button
                  className={`base-class ${activeCatBtn == key ? 'active-color' : ''}`}
                  onClick={() => {
                    filterCat(false, category.nameCat);
                    setActiveCatBtn(key);
                  }}
                >
                  {category.nameCat}
                </button>
              </div>
            ))
          : null}
      </div>
      <div className="cardsContainer">
        {produtosDisplay != null ? (
          produtosDisplay.category.length != 0 ? (
            produtosDisplay.category.map((produto, key1) => (
              <div key={key1}>
                <div className="categoryDivisor">
                  <span className="name-cat-txt">{produto.nameCat}</span>
                  <div
                    className="icon-trash-container"
                    onClick={() => {
                      setDeleteCat(produto.nameCat);
                      setModalConfirmDeleteVisibility(true);
                    }}
                  >
                    <img className="icon-trash-img" src={trash}></img>
                  </div>
                </div>
                {produto.itens.map((iten, key2) => (
                  <div
                    key={key2}
                    className="cards"
                    onClick={() => {
                      document.getElementById(iten.id).checked = document.getElementById(iten.id).checked !== true;
                      prepareSelected(iten.id, document.getElementById(iten.id).checked !== false);
                    }}
                  >
                    <div className="imgInptContainer">
                      <input
                        type="checkbox"
                        id={iten.id}
                        name="checkbox"
                        onClick={e => e.stopPropagation()}
                        onChange={value => {
                          prepareSelected(iten.id, value.target.checked);
                        }}
                      />
                      <div className="imgContainer">
                        <img className="productImg" src={iten.img == null ? defaultProduct : iten.img} alt="logo" />
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
                        onClick={e => {
                          e.stopPropagation();
                          setDescricaoVisibility(true);
                          setmodalDescContent(iten);
                        }}
                      >
                        Detalhes
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
          <button onClick={() => setModalExportPdfVisibility(true)} className="btn-primary">
            Gerar relatorio
          </button>
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

      <ModalDetalhes
        show={modalDetalhesVisibility}
        onClose={() => setDescricaoVisibility(false)}
        descricao={modalDescContent}
        deleteCallBack={id => {
          deleteId(id);
        }}
      />

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

      <Exportpdf show={modalExportPdfVisibility} produtos={produtos} onClose={() => setModalExportPdfVisibility(false)} />
    </div>
  );
}
