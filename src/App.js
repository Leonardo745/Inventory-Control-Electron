import logo from './logo.svg';
import "./App.css";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <div>
        <div>
        <input type="text" id="fname" name="fname"/>
        </div>
        <div>
          <button>Adicionar Produto</button>
          <button>Adicionar Categoria</button>
        </div>
      </div>

      <div>
        <div>
          <button>Todos</button>
        </div>
        <div>
          <button>Sala</button>
        </div>
        <div>
          <button>Quarto</button>
        </div>
        <div>
          <button>Cozinha</button>
        </div>
      </div>

      <div>
        <div>
          <input type="checkbox" id="test" name="test" value="test"/>
          <img src={logo} alt= "logo"/>
          <div>
            <div>
              <span>Nome do Produto</span>
            </div>
            <div>
              <span>Quanti.</span>
            </div>
            <div>
              <span>Preço</span>
            </div>
          </div>
          <div>
            <button>Descrição</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
