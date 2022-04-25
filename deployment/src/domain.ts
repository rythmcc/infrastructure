import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'

export class DomainResources extends Construct {
    public static CreateDomainResources(scope: Construct) {
        const domainName: string = 'rythm.cc'

        const zone = new route53.PublicHostedZone(scope, 'HostedZone', {
            comment: `domain for ${domainName}`,
            zoneName: `${domainName}`,
        })

        const certificate = new acm.DnsValidatedCertificate(
            scope,
            'CrossRegionCertificate',
            {
                domainName: `*.${domainName}`,
                subjectAlternativeNames: [`${domainName}`],
                hostedZone: zone,
                region: 'us-east-1',
            }
        )

        new cdk.CfnOutput(scope, 'RythmOriginHostZoneId', {
            exportName: 'rythm-origin-hostedzoneid',
            value: zone.hostedZoneId,
        })

        new cdk.CfnOutput(scope, 'RythmOriginCertificateArn', {
            exportName: 'rythm-origin-certificatearn',
            value: certificate.certificateArn,
        })
    }
}
