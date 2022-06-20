import React, { useState, useEffect } from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';

const ModalCategoria = props => {
  const [produtos, setProdutos] = useState(null);

  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorCatEmptVisibility, setErrorCatEmptVisibility] = useState(false);
  const [cat, seCat] = useState('');

  async function AddCategory(cat) {
    var catExist = false;
    produtos.category.forEach(item => {
      //console.log(item);
      if (item.nameCat == cat) {
        catExist = true;
        console.log("Categoria '" + cat + "' já existe!");
      }
    });
    if (cat == '') {
      catExist = true;
      setErrorCatEmptVisibility(true);
      console.log('Categoria Vazia');
    }

    if (!catExist) {
      var prod = produtos;
      var newCat = { nameCat: cat, itens: [] };
      prod.category.push(newCat);
      console.log("Categoria '" + cat + "' Adicionada");
      setProdutos(prod);
      let result = await Api.saveData(prod);
      console.log('Retorno da Api: ' + result);
      return 0;
    } else {
      return 1;
    }
  }

  async function handleClickConfirm() {
    var response = await AddCategory(cat);

    if (response === 0) {
      closeModal();
    } else {
      setErrorVisibility(true);
    }
  }

  function closeModal() {
    props.onClose();
    setErrorVisibility(false);
    setErrorCatEmptVisibility(false);
    seCat('');
  }

  useEffect(() => {
    setProdutos(props.produtos);
  }, [props.produtos]);

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={closeModal}>
      {errorVisibility ? (
        <div className="error">
          <span className="error-text">{errorCatEmptVisibility ? 'O campo Categoria deve ser preechido' : 'Categoria "' + cat + '" já existe'}</span>
        </div>
      ) : null}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Nova Categoria</h4>
        </div>
        <div className="modal-body">
          <p>Nome:</p>
          <input
            maxLength={17}
            className="modal-searchbar-NovoItem"
            type="text"
            onChange={e => {
              seCat(e.target.value);
              setErrorVisibility(false);
              setErrorCatEmptVisibility(false);
            }}
          />
        </div>
        <div className="modal-footer">
          <button onClick={() => handleClickConfirm()}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoria;
