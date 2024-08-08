export default function ApiResponse(statusCode: number, message: string, data?: any) {
    return {
        statusCode: statusCode,
        message: message,
        data: data
    }
}
