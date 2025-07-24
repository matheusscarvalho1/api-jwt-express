import { Response, Request } from 'express'

const HealthStatus = (req: Request, res: Response) => {

    res.send({
        status: "ok",
        time: new Date().toISOString()
})
}
export default HealthStatus;