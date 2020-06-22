export default async (request: RequestInfo): Promise<any> => {
  try {
    const response = await fetch(request)
    const body = await response.json()
    return body
  } catch (e) {
    return e
  }
}
