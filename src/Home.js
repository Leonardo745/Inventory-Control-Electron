import logo from "../public/images/logo.svg";
import "../styles/styles.css";
import React from "react";
import { useState, useEffect } from "react";
import ModalAddItem from "./component/ModalAddItem";
import ModalDetalhes from "./component/ModalDetalhes";
import ModalCategoria from "./component/ModalCategorias";
import ReactToPrint from "react-to-print";

export default function Home() {
  const [produtos, setProdutos] = useState(null);

  async function AddItem(cat, args) {
    var prod = produtos;
    args.id = produtos.count + 1;

    var map = produtos.category.map((item) => {
      console.log(item);
      if (item.nameCat == cat) {
        item.itens.push(args);
      }
      return item;
    });
    console.log(map);
    prod.category = map;
    prod.count++;
    setProdutos(prod);

    let result = await Api.saveData(prod);
    console.log(result);
  }
  async function handleLoadData() {
    const result = await Api.readData();
    setProdutos(result === undefined ? null : result);
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  const [modalAddItemVisibility, setModalAddItemVisibility] = useState(false);
  const [modalCategoriaVisibility, setModalCategoriaVisibility] =
    useState(false);

  return (
    <div className="container">
      <div className="header">
        <div className="searchBarContainer">
          <input className="searchBar" type="text" id="fname" name="fname" />
        </div>
        <div className="headerBtnContainer">
          <button
            onClick={() =>
              AddItem("Sala", {
                id: 0,
                name: "Random",
                quant: 100,
                value: 699.9,
              })
            }
          >
            Adicionar Produto
          </button>
          <button
            onClick={() => {
              console.log(produtos);
            }}
          >
            Adicionar Categoria
          </button>
        </div>
      </div>

      <div className="categorys">
        <button>Todos</button>
        {produtos !== null
          ? produtos.category.map((category, key) => (
              <div key={key}>
                <button>{category.nameCat}</button>
              </div>
            ))
          : null}
      </div>
      <ReactToPrint
        content={() => document.getElementById("pdf")}
        trigger={() => (
          <button className="btn btn-primary">Print to PDF!</button>
        )}
      />
      <div className="cardsContainer" id="pdf">
        {produtos !== null
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
                        id="test"
                        name="test"
                        value="test"
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
                        <span>{iten.value}</span>
                      </div>
                    </div>
                    <div className="descripContainer">
                      <button>Descrição</button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
      <div className="retiradaBtnContainer">
        <button
          className="retiradaBtn"
          onClick={() => setModalAddItemVisibility(true)}
        >
          Registrar Retirada
        </button>
      </div>

      <ModalAddItem
        show={modalAddItemVisibility}
        onClose={() => setModalAddItemVisibility(false)}
      />
      <ModalDetalhes show={false} />

      <div className="CategoriaBtnContainer">
        <button
          className="CategoriaBtn"
          onClick={() => setModalCategoriaVisibility(true)}
        >
          Cria categoria
        </button>
      </div>

      <ModalCategoria
        show={modalCategoriaVisibility}
        onClose={() => setModalCategoriaVisibility(false)}
      />
    </div>
  );
}
