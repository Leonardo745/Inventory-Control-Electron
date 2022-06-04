import React, { useState, useEffect } from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';

const ModalNovoItem = props => {
  const [produtos, setProdutos] = useState(null);

  const [nome, setNome] = useState('');
  const [cat, seCat] = useState('');
  const [desc, setDesc] = useState('');
  const [preco, setPreco] = useState(0);
  const [quant, setQuant] = useState(0);
  const [errorVisibility, setErrorVisibility] = useState(false);

  async function AddItem(cat, args) {
    var prod = produtos;
    args.id = produtos.count + 1;

    var catExist = false;
    produtos.category.forEach(item => {
      if (item.nameCat == cat) {
        catExist = true;
        console.log("Categoria '" + cat + "' encontrada");
      }
    });

    if (catExist) {
      var map = produtos.category.map(item => {
        if (item.nameCat == cat) {
          item.itens.push(args);
          console.log("Produto '" + args.name + "' Adicionado");
        }
        return item;
      });
      prod.category = map;
      prod.count++;

      setProdutos(Object.create(prod));
      let result = await Api.saveData(prod);
      console.log('Retorno da Api: ' + result);
      return 0;
    } else {
      console.log("Categoria '" + cat + "' não encontrada");
      return 1;
    }
  }

  async function handleClickConfirm() {
    var response = await AddItem(cat, {
      id: 0,
      name: nome,
      quant: quant,
      value: preco,
      description: desc,
      selectedQuant: 0,
    });

    if (response === 0) {
      closeModal();
    } else {
      setErrorVisibility(true);
    }
  }

  function closeModal() {
    props.onClose();

    setNome('');
    seCat('');
    setDesc('');
    setPreco(0);
    setQuant(0);
    setErrorVisibility(false);
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
          <span className="error-text">Categoria {cat} não encontrada</span>
        </div>
      ) : null}

      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Novo Item</h4>
        </div>
        <div className="modal-body-Novoitem">
          <p>Nome:</p>
          <input maxLength={30} className="modal-searchbar-NovoItem" type="text" onChange={e => setNome(e.target.value)} />
          <p>Categoria:</p>
          <input
            maxLength={18}
            className="modal-searchbar-NovoItem"
            type="text"
            onChange={e => {
              seCat(e.target.value);
              setErrorVisibility(false);
            }}
          />
          <p>Descricao:</p>
          <input className="modal-searchbar-NovoItem" type="text" onChange={e => setDesc(e.target.value)} />
          <p>Preco:</p>
          <input className="modal-searchbar-NovoItem" type="number" onChange={e => setPreco(Number(e.target.value))} />
          <p>Quantidade em estoque inicial:</p>
          <input className="modal-searchbar-NovoItem" type="number" onChange={e => setQuant(Number(e.target.value))} />
        </div>
        <div className="modal-footer">
          <button onClick={() => handleClickConfirm()}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoItem;
