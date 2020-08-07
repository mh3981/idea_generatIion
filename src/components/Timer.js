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
        // console.log(obj)

        const api_response = await API.graphql(graphqlOperation(createUserInfo, {input: obj}));

        document.getElementById('root').innerHTML = ""
        document.getElementById('orgChartContainer').innerHTML = "<h1 style='padding: 10px'>You finished the work, please copy your verification code: "+obj.success_code+"</h1>"
        alert("You finished the work, please copy your verification code: "+obj.success_code);

        sessionStorage.clear();
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