import userModel from './user/model'
import connection from './connection'
import userLoggerModel from './logger/model'
import requestCounterModel from './logger/model/requestCounter.schema'
const User=userModel(connection)
const UserLogger=userLoggerModel(connection)
const RequestCounter=requestCounterModel(connection)

export const Models={
    User,
    UserLogger,
    RequestCounter
}