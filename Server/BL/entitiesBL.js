const { getCache, setCache } = require("../services/cacheServiceManager")
const { getEntitySwapi } = require("../utils/swapi")

const entitiesBL = {
    getEntityBL: async (entity) => {
        try{
            console.log(`start getEntityBL. entity: ${entity}`)
            const isCached = await getCache(`entity-${entity}`)
            let data
            if(isCached === undefined){
                data = await getEntitySwapi(entity)
                await setCache(`entity-${entity}`, {data: data.data, next: data.next}, 604800)//cache for one week
            }
            else{
                data = isCached
            }
            console.log(`done getEntityBL. entity: ${entity}`)
            return data
        }
        catch(err){
            console.log(err.message)
            throw err
        }
    }
}

module.exports = entitiesBL