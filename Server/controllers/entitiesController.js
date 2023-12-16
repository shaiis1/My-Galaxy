const { getEntityBL } = require('../BL/entitiesBL')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

exports.getEntity = asyncHandler(async (req, res, next) => {
    const { entity } = req.query
    try {
      console.log(`start getEntity.`)
      const response = await getEntityBL(entity)
      console.log(`done getEntity.`)
  
      res.status(200).json({
        success: response? true: false,
        message: 'getEntity fetched successfully',
        data: response.data,
        next: response.next
      })
    } catch (err) {
      console.log('error in getEntity', err)
      postException(err)
      return next(new ErrorResponse('getEntity failed', 404))
    }
  })