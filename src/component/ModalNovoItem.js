import React, { useState } from 'react';
import '../../styles/modal.css';
import '../../styles/styles.css';
import logo from '../../public/images/logo.svg';
import * as myModule from '../Home';

const ModalNovoItem = props => {
  const [Category, SetCategory] = useState();
  const [Args, SetArgs] = useState();

  const [nome, SetNome] = useState();
  const [desc, SetDesc] = useState();
  const [preco, SetPreco] = useState();
  const [quant, SetQuant] = useState();

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Novo Item</h4>
        </div>
        <div className="modal-body-Novoitem">
          <p>Nome:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname" name="fname" onChange={e => SetNome(e.target.value)} />
          <p>Categoria:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname1" name="fname" onChange={e => SetCategory(e.target.value)} />
          <p>Descricao:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname2" name="fname" onChange={e => SetDesc(e.target.value)} />
          <p>Preco:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname3" name="fname" onChange={e => SetPreco(e.target.value)} />
          <p>Quantidade em estoque inicial:</p>
          <input className="modal-searchbar-NovoItem" type="text" id="fname4" name="fname" onChange={e => SetQuant(e.target.value)} />
        </div>
        <div className="modal-footer">
          <button onClick={(() => SetArgs([nome, desc, preco, quant]), console.log(Args))}>Alterar</button>
          <button onClick={() => myModule.AddItem[(Category, Args)]}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoItem;
