import React from "react";
import AppLayout from "./components/AppLayout";
import appStore from "./utils/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={appStore}>
      <div>
        <AppLayout />
      </div>
    </Provider>
  );
};

export default App;
