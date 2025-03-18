import React from "react";
import Map from "./components/Map/Map";
import Json from "./components/fetch_data/json_dis";
import { List } from "@material-ui/core";
import List1 from "./components/List/List";
import { useState } from "react";
import useJsonData from './components/useJsonData';

console.log("hi");
const App= ()=>{

    const [childClicked, setChildClicked]=useState(null);
    const markers = useJsonData();

    const[isLoading,setIsLoading]=useState(false);


    return(
        <div style={{display:'flex'}}>
            <List1 childClicked={childClicked} markers={markers} isLoading={isLoading}/>
            <Map setChildClicked={setChildClicked}/>
        </div>

    );

}
export default App;