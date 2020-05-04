import React from 'react'
import RedirectToService from '../components/RedirectToService'

const Jellyfin = () => {
    return (
        <RedirectToService scheme='http' netmask='192.168.1.0/24' port={8096} />
    )
}

export default Jellyfin