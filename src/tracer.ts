import { NodeSDK }            from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter }  from '@opentelemetry/exporter-trace-otlp-http'
import { Resource }           from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

import logger                 from './Logger'

export const init = (url: string) => {

  const traceExporter = new OTLPTraceExporter({ url })

  const sdk = new NodeSDK({
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.SIGNOZ_SERVICE_NAME,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
    })
  })

  // initialize the SDK and register with the OpenTelemetry API
  // this enables the API to record telemetry
  sdk.start()
    .then(() => logger.info('Tracing initialized for ' + url))
    .catch((error) => logger.error('Error initializing tracing: ' + url + ' : ' + JSON.stringify(error)))

  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => logger.info('Tracing terminated for ' + url))
      .catch((error) => logger.error('Error terminating tracing: ' + url + ' : ' + JSON.stringify(error)))
      .finally(() => process.exit(0))
  })
}
