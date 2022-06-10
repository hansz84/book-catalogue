import { useContext } from "react";
import "./App.css";
import Books from "./components/books/Books";
import Tags from "./components/tags/Tags";
import AppContext from "./store/app-context";

function App() {
  const appCtx = useContext(AppContext);

  return (
    <div className="App">
      <Tags />
      {appCtx.reload && <Books />}
    </div>
  );
}

export default App;
