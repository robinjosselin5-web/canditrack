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

export interface IPaginatedResponse<TItem> {
  items: TItem[]
  page: number
  limit: number
  total: number
  pages: number
}
