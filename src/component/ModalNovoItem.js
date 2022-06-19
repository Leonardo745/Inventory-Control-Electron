import React, { useState, useEffect } from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';

const ModalNovoItem = props => {
  const [produtos, setProdutos] = useState(null);

  const [nome, setNome] = useState('Produto sem Nome');
  const [cat, seCat] = useState('');
  const [desc, setDesc] = useState('Produto sem Descrição');
  const [preco, setPreco] = useState(0);
  const [quant, setQuant] = useState(0);
  const [base64Img, setBase64Img] = useState(
    'data:image/png;base64,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30lS8MPMSLeMafzPaPPvX/Dwh0X2i9NxYgr+s3HkmwadueO4/GvoIIC/BHAaHpeCO86MZtuwph+E/t0xNcNBAL8J4GRUuUD8QVMnKtKfOPo4f8WMThH9BgJ4TADHuXDF0Z8vfSLdiZb6Q+YWH9m0aGr7CH8eATwngJM65NlF282h3MH1nJjIiOaHEcB7Anw/i2mOFRDAowLYAgEQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAABEAABEAABEAABEAABEAABEAABEKAK+XnK5COArwQYpP3PG4QACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAAARWgEAHsUehBAdYggD3WeVCAtxHAHgs9KMBfEcAeL3tQgPs9dYSuT24BxnhQgM58AtijmwcFcLYigC22p3hRgCkIYIupXpx/p3MlAtihsrMnBXBeRAA7vOjN+XdaFSOADYpbeVQAZywC2GCsV+ffSZ2HAO4zL9WzAjh1ViOA26yu43iYVtsQwF22tXI8zSlLEcBNlp7ieJxaMxDAPWbUcrzPiD0I4A57Rji+oP6EEgTQp2RCfccvtB61uAIBNKlYPKq14ysaDRw5/oX5byWKPtr/nj4J+6fMf2H8yIGNHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPA1/w+6IpPeMz1YdgAAAABJRU5ErkJggg=='
  );
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
      img: base64Img,
    });

    if (response === 0) {
      closeModal();
    } else {
      setErrorVisibility(true);
    }
  }

  function closeModal() {
    props.onClose();

    setNome('Produto sem Nome');
    seCat('');
    setDesc('Produto sem Descrição');
    setPreco(0);
    setQuant(0);
    setErrorVisibility(false);
  }

  async function encodeImageFileAsURL(element) {
    console.log('BASE64');
    console.log(element);
    var filesSelected = element;

    var fileToLoad = filesSelected;

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      console.log('base64');
      console.log(srcData);
      setBase64Img(srcData);
    };
    fileReader.readAsDataURL(fileToLoad);
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
          <span className="error-text">Categoria "{cat}" não encontrada</span>
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
            maxLength={17}
            className="modal-searchbar-NovoItem"
            type="text"
            onChange={e => {
              seCat(e.target.value);
              setErrorVisibility(false);
            }}
          />
          <p>Descricao:</p>
          <input className="modal-searchbar-NovoItem" type="text" onChange={e => setDesc(e.target.value)} />
          <p>Preço:</p>
          <input className="modal-searchbar-NovoItem" type="number" onChange={e => setPreco(Number(e.target.value))} />
          <p>Quantidade em estoque inicial:</p>
          <input className="modal-searchbar-NovoItem" type="number" onChange={e => setQuant(Number(e.target.value))} />
          <p>Foto:</p>
          <input type="file" name="" id="fileId" onChange={event => encodeImageFileAsURL(event.target.files[0])} />
        </div>
        <div className="modal-footer">
          <button onClick={() => handleClickConfirm()}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoItem;
