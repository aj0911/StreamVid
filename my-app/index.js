import { registerRootComponent } from "expo";
import App from "./App";
import SafeAreaViewAndroid from "./Components/SafeAreaViewAndroid";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const root = ()=>{
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <SafeAreaViewAndroid Component={App}/>
            </PersistGate>
        </Provider>
    )
}
registerRootComponent(root)