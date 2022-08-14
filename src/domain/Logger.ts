export class Logger {
    constructor() { }

    log(message: string) {
        const date = new Date()
        const text = `DEBUG: ${this.getDateString(date)} - ${message}`

        console.log(text)
    }

    warn(message: string) {
        const date = new Date()
        const text = `\x1b[33mWARNING: ${this.getDateString(date)} - ${message}\x1b[0m`

        console.warn(text)
    }

    error(message: string) {
        const date = new Date()
        const text = `\x1b[31mERROR: ${this.getDateString(date)} - ${message}\x1b[0m`

        console.error(text)
    }

    private getDateString(date: Date) {
        return `${date.toLocaleString()}`
    }
}