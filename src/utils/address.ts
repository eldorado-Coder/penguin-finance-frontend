import { times } from "lodash"

export const getShortenAddress = (address: string) => {
    if (!address || address.length === 0) return ''
    return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export const formatTime = (timeStamp: number, type = "min") => {
    if (type === 'min') {
        return Math.round(timeStamp / 60);
    }
    return timeStamp;
}