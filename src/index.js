import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Timer from  './components/Timer'
import * as serviceWorker from './serviceWorker';

import {createUserInfo} from '../src/graphql/mutations';
import {listSeedwords} from '../src/graphql/queries';
import {listDescriptions} from '../src/graphql/queries'
import { API, graphqlOperation } from "aws-amplify";

import Amplify from 'aws-amplify';
import aws_config from "./aws-exports";
Amplify.configure(aws_config);




async function get_seed_word() {
    try {
        sessionStorage.clear();
        document.getElementById("orgChartContainer").style.visibility='hidden'

        const api_response = await API.graphql(graphqlOperation(listSeedwords));
        var seedword_list = api_response.data.listSeedwords.items
        var idx = Math.floor(Math.random() * seedword_list.length)
        sessionStorage.setItem("seedword", seedword_list[idx].seed);
        sessionStorage.setItem("time_allowed_sec", seedword_list[idx].time_allowed%60);
        sessionStorage.setItem("time_allowed_min", parseInt(seedword_list[idx].time_allowed/60));
        console.log('Success: fetch seed word info')

        const api_response2 = await API.graphql(graphqlOperation(listDescriptions));
        var desc_list = api_response2.data.listDescriptions.items
        var idx = Math.floor(Math.random() * desc_list.length)
        sessionStorage.setItem("description", desc_list[idx].value);
        console.log('Success: fetch description info')

        // console.log(sessionStorage)

        document.getElementById("orgChartContainer").style.visibility='visible'
        document.getElementById("index_loading_hint").style.display='none'
        document.getElementById("initialize_node_btn").click()

        // document.getElementById('idea_instruction').innerHTML = "<h1 style='padding: 10px; font-size: 16px; text-align: left;' >"+sessionStorage.getItem("description")+"</h1>"
        document.getElementById('idea_instruction').innerHTML = sessionStorage.getItem("description")


        ReactDOM.render(
            <React.StrictMode>
            <Timer />
            <App />
            </React.StrictMode>,
            document.getElementById('root')
        );




    } catch (err) { 
        console.log('error in initialization') 
    }
};

get_seed_word()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
