const { default: axios } = require("axios")
const { ENTITIES } = require("./enums")

exports.getEntitySwapi = async(entity) => {
    try{
        console.log(`start getEntitySwapi. entity: ${entity}`)
        const entityStr = ENTITIES[parseInt(entity)]
        let data
        let next
        await axios.get(`https://swapi.dev/api/${entityStr}`).then( res => {
            data = res.data.results
            next = res.data.next
        }).catch( err => {
            console.log(err)
        })
        console.log(`done getEntitySwapi. entity: ${entity}`)
        return {data: data, next: next}
    }
    catch(err){
        console.log(err.message)
        throw(err)
    }
}