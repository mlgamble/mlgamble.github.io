import React from 'react'
import { Netmask } from 'netmask'
import { BrowserRouter as Router, Route } from "react-router-dom";

const isReachablePromise = (scheme, host, port, ms) => {
    /*
    let controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return new Promise((resolve, reject) => {
        try {
            fetch(`${scheme}://${host}:${port}`, {
                mode: 'no-cors',
                referrerPolicy: 'unsafe-url',
                signal: controller.signal})
                .then(() => resolve(), () => reject())
                .catch(() => reject());
        } catch(err) {
            reject();
        }
    }).then(() => host, () => null);*/

    const dgram = require('dgram');
    const data = new Buffer("Hello world");
    const client = dgram.createSocket("udp4");
}

const FindService = async (scheme, netmask, port, ms) => {
    const block = new Netmask(netmask);
    const reachablePromises = [];
    block.forEach((host) => reachablePromises.push(isReachablePromise(scheme, host, port, ms)));

    return Promise.all(reachablePromises);
}

class RedirectToService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, host: null};
    }

    componentDidMount() {
        FindService(this.props.scheme ?? 'https', this.props.netmask, this.props.port, this.props.ms ?? 3000)
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
            return <Router><Route component={() => window.location = `${this.props.scheme ?? 'https'}://${this.state.host}:${this.props.port}/`} /></Router>
        }
    }
}

export default RedirectToService;