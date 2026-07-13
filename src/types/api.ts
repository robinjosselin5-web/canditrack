export interface IApiError {
  field?: string
  message: string
}

export interface IApiResponse<TData> {
  success: boolean
  data: TData
  message?: string
  errors?: IApiError[]
}
