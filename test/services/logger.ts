import { ILogObject, Logger } from 'tslog'
import { writeFileSync }  from 'fs'

const logDebugToFile = function(logObject: ILogObject) {
    logToTransport('./logs/debug.log', logObject)
}

const logInfoToFile = function(logObject: ILogObject) {
    logToTransport('./logs/info.log', logObject)
}

const logOthersToFile = function(logObject: ILogObject) {
    logToTransport('./logs/others.log', logObject)
}

const logToTransport = function(fileName: string, logObject: ILogObject) {
    writeFileSync(fileName,
        `${JSON.stringify(logObject.date)  }:
            ${JSON.stringify(logObject.logLevel)  }:
            ${JSON.stringify(logObject.fileName)  }:
            ${JSON.stringify(logObject.lineNumber)  }:
            ${JSON.stringify(logObject.columnNumber)  }:
            ${JSON.stringify(logObject.argumentsArray)  }\n`,
        { encoding: 'utf8', flag: 'a' })
}

const logger: Logger = new Logger({ dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
logger.attachTransport({
    silly: logOthersToFile,
    debug: logDebugToFile,
    trace: logOthersToFile,
    info: logInfoToFile,
    warn: logOthersToFile,
    error: logOthersToFile,
    fatal: logOthersToFile,
},
'debug')

export default logger
