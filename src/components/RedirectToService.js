import React from 'react'
import { Netmask } from 'netmask'
import { BrowserRouter as Router, Route } from "react-router-dom";

const isReachablePromise = (host, port, ms) => {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return new Promise((resolve, reject) => {
        try {
            fetch(`http://${host}:${port}`, {
                mode: 'no-cors',
                signal: controller.signal})
                .then(() => resolve(), () => reject())
                .catch(() => reject());
        } catch(err) {
            reject();
        }
    }).then(() => host, () => null);
}

const FindService = async (netmask, port, ms) => {
    const block = new Netmask(netmask);
    const reachablePromises = [];
    block.forEach((host) => reachablePromises.push(isReachablePromise(host, port, ms)));

    return Promise.all(reachablePromises);
}

class RedirectToService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, host: null};
    }

    componentDidMount() {
        FindService(this.props.netmask, this.props.port, this.props.ms ?? 2000)
        .then((hosts) => 
            this.setState({
                loading: false,
                host: hosts.find((host) => host != null),
            })
        );
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        } else if (this.state.host == null) {
            return <div>Not Found</div>
        } else {
            return <Router><Route component={() => window.location = `http://${this.state.host}:${this.props.port}/`} /></Router>
        }
    }
}

export default RedirectToService;