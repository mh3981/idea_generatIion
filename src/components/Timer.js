import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import {createUserInfo} from '../../src/graphql/mutations';
import {listSeedwords} from '../../src/graphql/queries';
import { API, graphqlOperation } from "aws-amplify";

export default class Timer extends Component {
    state = {
        minutes: parseInt(sessionStorage.getItem("time_allowed_min")),
        seconds: parseInt(sessionStorage.getItem("time_allowed_sec")),
    }

    componentDidMount() {
        // this.get_seed_word()
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    document.getElementById('upload_user_info_btn').click()
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        },  1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    upload_user_info = async () => {
        clearInterval(this.myInterval)
        
        console.log("Finished, upload data to database")
        document.getElementById('send_api_request').click()

        var json_string = sessionStorage.getItem("tree_data_obj");
        var obj = JSON.parse(json_string)
        var node_index = obj['node_index']
        var node_value = obj['node_value']
        var array_length = 1
        if (node_index.length>node_value.length){
            array_length = node_value.length
        } else {
            array_length = node_index.length
        }


        // const api_response = await API.graphql(graphqlOperation(createUserInfo, {input: obj}));

        document.getElementById('root').innerHTML = ""
        // document.getElementById('orgChartContainer').innerHTML = "<h1 style='padding: 10px'>You finished the work, please copy your verification code: "+obj.success_code+"</h1>"
        document.getElementById('idea_instruction').innerHTML = "<h1 style='padding: 10px; font-size: 16px'>You finished the work, please copy your verification code: <br>"+obj.success_code+"</h1>"

        // document.getElementById('orgChartContainer').innerHTML = ""
        // for (var i=1 ; i<=array_length; i++){
        //     document.getElementById('orgChartContainer').innerHTML += "<h3 style='padding: 10px'>" +node_index[i] + " : " + node_value[i] + "</h3>"
        // }


        alert("You finished the work, please copy your verification code: "+obj.success_code);


        // create and save csv file
        try{
            var csv = 'index,idea\n';

            var tree_data = []
            tree_data.push([1, sessionStorage.getItem("seedword")])
            for (var i=1 ; i<=array_length; i++){
                var temp_data = []
                temp_data.push(node_index[i])
                temp_data.push(node_value[i])
                tree_data.push(temp_data)
            }

            tree_data.forEach(function(row) {
                    csv += row.join(',');
                    csv += "\n";
            });

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'idea list.csv';
            hiddenElement.click();

        } catch (e){
            console.log('fail to download the idea list')
            console.log(e)
        }


        // try{
            // html2canvas(document.querySelector("#orgChartContainer")).then(canvas => {
            //     document.body.appendChild(canvas)
            // });
        //     document.getElementById("cap_screen_btn").click()
        // }catch (e){
        //     console.log('Fail to cache screen shot')
        //     console.log(e)
        // }


        // sessionStorage.clear();
    };

    render() {
        const { minutes, seconds } = this.state

        const divStyle = {
            display: 'inline-grid',
            padding: '20px',
        };
        const leftDivStyle = {
            // float: 'left',
            padding: '10px 10px 0px 15px',
            width: '150px'
        };
        const rightDivStyle = {
            // float: 'right',
            display: 'none',
            padding: '10px',
        };
        const timeCountStyle = {
            background: "white",
            width: "fit-content",
        }
        return (
            <div style={divStyle}>
                <div style={leftDivStyle}>
                    { minutes === 0 && seconds === 0
                        ? <h1 style={timeCountStyle}>Finished</h1>
                        : <h1 style={timeCountStyle}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    }
                </div>

                <div style={rightDivStyle}>
                    <Button id="upload_user_info_btn" primary onClick={this.upload_user_info}>Submit</Button>
                </div>
                
            </div>
        )
    }
}