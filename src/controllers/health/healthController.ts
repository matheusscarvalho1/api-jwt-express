import { Response, Request } from 'express'

const HealthStatus = ( req: Request, res: Response) => {

    return res.send({
        status: "pong",
        time: new Date().toISOString()
})
}
export default HealthStatus;