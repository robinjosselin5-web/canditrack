export interface IApiSuccessResponse<TData> {
  success: true
  data: TData
}

export interface IApiErrorDetail {
  field?: string
  message: string
}

export interface IApiErrorResponse {
  success: false
  message: string
  errors: IApiErrorDetail[]
}
