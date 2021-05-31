import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Form from "./Components/Form";

function App() {
  return (
    //<Form />
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
}

export default App;
