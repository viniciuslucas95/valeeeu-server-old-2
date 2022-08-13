export class Logger {
    constructor() { }

    log(message: string) {
        const date = new Date()
        const text = `DEBUG: ${this.getDateString(date)} - ${message}`

        console.log(text)
    }

    warn(message: string) {
        const date = new Date()
        const text = `WARNING: ${this.getDateString(date)} - ${message}`

        console.warn(text)
    }

    error(message: string) {
        const date = new Date()
        const text = `ERROR: ${this.getDateString(date)} - ${message}`

        console.error(text)
    }

    private getDateString(date: Date) {
        return `${date.toLocaleString()}`
    }
}