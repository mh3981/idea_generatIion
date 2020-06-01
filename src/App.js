import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from  './components/Timer'
import {createUserInfo} from '../src/graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";



function App() {

    function get_data_2(para){
        console.log("get_data_2")
        console.log(para)
    }

    function get_data(){
        // return document.getElementById('cloud_api_button').innerHTML
        userInfo1.name = "new_name"
    }

    const userInfo1 = {
        name: "default_name",
        success_code: "default_code",
        node_index: [0],
        node_parent: [0],
        node_value: ["1"],
        node_time: ["1"],
        click_index: [0],
        click_type: [0],
        click_time: ["1"]
    };

    async function asyncCall(_info) {
        console.log("13579 !!!!!!!!!!!!!!!!!!!!")


        var json_string = sessionStorage.getItem("tree_data_obj");
        var obj = JSON.parse(json_string)
        console.log(obj)

        get_data()
        console.log(userInfo1)
        // const api_response = API.graphql(graphqlOperation(createUserInfo, {input: userInfo1}));
        // console.log(userInfo)
        // console.log(api_response)
    };

    return (

        <div className="App">
        </div>
    );
}

export default App;
