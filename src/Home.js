import logo from "../public/images/logo.svg";
import "../styles/styles.css";
import React from 'react';
import ModalAddItem from"./component/ModalAddItem";


async function AddItem() {
    let result = await Api.sayHello("Vim do react");
    console.log(result);
  }

function Home() {
  const categorys = [
    {
      name: "Todos",
    },
    {
      name: "Sala",
    },
    {
      name: "Cozinha",
    },
    {
      name: "Quarto",
    },
  ];

  const produtos = [
    {
      name: "Teste",
      quant: 10,
      value: "200",
    },
    {
      name: "Cadeira",
      quant: 30,
      value: "1000",
    },
    {
      name: "Mesa",
      quant: 340,
      value: "500",
    },
    {
      name: "Sofá",
      quant: 370,
      value: "1000",
    },
    {
      name: "Tapete",
      quant: 530,
      value: "1000",
    },
    {
      name: "Abajur",
      quant: 930,
      value: "1000",
    },
    {
      name: "Criado",
      quant: 34,
      value: "1000",
    },
    {
      name: "Mesa de Passar",
      quant: 60,
      value: "1000",
    },
    {
      name: "Escrivaninha",
      quant: 39,
      value: "1000",
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="searchBarContainer">
          <input className="searchBar" type="text" id="fname" name="fname" />
        </div>
        <div className="headerBtnContainer">
          <button onClick={AddItem}>Adicionar Produto</button>
          <button>Adicionar Categoria</button>
        </div>
      </div>

      <div className="categorys">
        {categorys.map((category, key) => (
          <div key={key}>
            <button>{category.name}</button>
          </div>
        ))}
      </div>

      <div className="cardsContainer">
        {produtos.map((produto, key) => (
          <div key={key} className="cards">
            <div className="imgInptContainer">
              <input type="checkbox" id="test" name="test" value="test" />
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
                <span>{produto.value}</span>
              </div>
            </div>
            <div className="descripContainer">
              <button>Descrição</button>
            </div>
          </div>
        ))}
      </div>
      <ModalAddItem/>
    </div>
  );
}


export default Home;