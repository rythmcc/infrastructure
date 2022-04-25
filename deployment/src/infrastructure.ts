#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { RythmInfrastructureStack } from './infrastructure-stack'

const app = new cdk.App()
new RythmInfrastructureStack(app, 'RythmInfrastructureStack', {
    stackName: 'rythm-infrastructure-stack',
})
