import React from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import ReactToPrint from 'react-to-print';

const Exportpdf = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Relatório</h4>
        </div>
        <div className="modal-body">
          <div className="pdf">
            <div className="cardsContainer-pdf" id="pdf">
              {props.produtos !== null
                ? props.produtos.category.map((produto, key1) => (
                    <div key={key1}>
                      <div className="categoryDivisor-pdf">
                        <span>{produto.nameCat}</span>
                      </div>
                      {produto.itens.map((iten, key2) => (
                        <div key={key2} className="cards">
                          <div className="nomeContainer-pdf">
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
                        </div>
                      ))}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <ReactToPrint content={() => document.getElementById('pdf')} trigger={() => <button className="btn-primary">Salvar PDF</button>} />
        </div>
      </div>
    </div>
  );
};

export default Exportpdf;
