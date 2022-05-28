import logo from "../public/images/logo.svg";
import "../styles/styles.css";
import React from "react";
import { useState, useEffect } from "react";
import ModalAddItem from"./component/ModalAddItem";

function Home() {
  const produtos2 = [
    {
      nameCat: "Cozinha",
      itens: [
        {
          id: 0,
          name: "Cadeira",
          quant: 30,
          value: 259.9,
        },
        {
          id: 1,
          name: "Mesa",
          quant: 10,
          value: 599.9,
        },
        {
          id: 2,
          name: "Lustre",
          quant: 10,
          value: 699.9,
        },
      ],
    },
    {
      nameCat: "Sala",
      itens: [
        {
          id: 3,
          name: "Sofá",
          quant: 30,
          value: 259.9,
        },
        {
          id: 4,
          name: "Abajur",
          quant: 10,
          value: 599.9,
        },
        {
          id: 5,
          name: "Tapete",
          quant: 10,
          value: 699.9,
        },
      ],
    },
  ];
  const [produtos, setProdutos] = useState(null);

  async function AddItem(args) {
    let result = await Api.saveData(args);
    console.log(result);
  }
  async function handleLoadData() {
    const result = await Api.readData();
    setProdutos(result === undefined ? null : result);
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
          <button
            onClick={() => {
              AddItem(produtos2);
              handleLoadData();
            }}
          >
            Adicionar Produto
          </button>
          <button onClick={() => handleLoadData()}>Adicionar Categoria</button>
        </div>
      </div>

      <div className="categorys">
        <button>Todos</button>
        {produtos !== null
          ? produtos.map((category, key) => (
              <div key={key}>
                <button>{category.nameCat}</button>
              </div>
            ))
          : null}
      </div>

      <div className="cardsContainer">
        {produtos !== null
          ? produtos.map((produto, key1) => (
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
      <ModalAddItem/>
    </div>
  );
}
export default Home;