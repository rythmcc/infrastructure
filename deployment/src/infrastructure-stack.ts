import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'
import { DataResources } from './data-resources'
import { DashboardResources } from './dashboard-resources'
import { DomainResources } from './domain'

export class RythmInfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const vpc = new ec2.Vpc(this, 'RythmVpc', {
            cidr: '10.0.1.0/24',
            maxAzs: 2,
            enableDnsHostnames: true,
            enableDnsSupport: true,
            subnetConfiguration: [
                {
                    name: 'RythmPublic',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 26,
                },
                {
                    name: 'RythmIsolated',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                    cidrMask: 26,
                },
            ],
            natGateways: 0,
        })

        cdk.Tags.of(vpc).add('name', 'RythmVpc')

        DomainResources.CreateDomainResources(this)
        DataResources.CreateDataResources(this)
        DashboardResources.CreateDashboardResources(this)
    }
}
