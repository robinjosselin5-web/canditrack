import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

export function asyncHandler<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
  Locals extends Record<string, unknown> = Record<string, unknown>,
>(
  handler: (
    request: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    response: Response<ResBody, Locals>,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
  return (request, response, next) => {
    void handler(request, response, next).catch(next)
  }
}
