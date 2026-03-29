export function ensureFP(message: string) {
  return <T>(value: T | null | undefined): T => {
    if (value === null || value === undefined) {
      throw new Error(message)
    }
    return value
  }
}
