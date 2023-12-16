const NodeCache = require( "node-cache" )
const cache = new NodeCache()

exports.getCache = async(cacheName) => {
    try{
        return cache.get(cacheName)
    } catch (err){
        console.log(err)
        return null
    }
}

exports.setCache = async(cacheName, data, ttl) => {
    try{
        cache.set(cacheName,data,ttl)
        return
    } catch (err){
        console.log(err)
        throw err
    }
}