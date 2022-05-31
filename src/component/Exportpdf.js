import React from "react";
import "../../styles/modal.css";
import "../../styles/styles.css";
import logo from "../../public/images/logo.svg";

const Exportpdf = (props) => {
  if (!props.show) {
    return null;
  }
  return (
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
                    <input type="checkbox" id="test" name="test" value="test" />
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
  );
};

export default Exportpdf;
