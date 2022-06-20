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
  const [base64Img, setBase64Img] = useState(null);
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
    setBase64Img(null);
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
          <span className="error-text">Por favor, selecione uma categoria</span>
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
          <select
            defaultValue=""
            className="modal-searchbar-NovoItem"
            onChange={e => {
              seCat(e.target.value);
              setErrorVisibility(false);
            }}
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {produtos.category.map((category, key) => (
              <option key={key} value={category.nameCat}>
                {category.nameCat}
              </option>
            ))}
          </select>
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
