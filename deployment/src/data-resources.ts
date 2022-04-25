import * as cdk from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as logs from 'aws-cdk-lib/aws-logs'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as kinesis from 'aws-cdk-lib/aws-kinesis'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as kinesisfirehose from 'aws-cdk-lib/aws-kinesisfirehose'
import { Construct } from 'constructs'

export class DataResources {
    public static CreateDataResources(scope: Construct) {
        new dynamodb.Table(scope, 'RythmDataTable', {
            tableName: 'rythm-data',
            partitionKey: {
                name: 'pk',
                type: dynamodb.AttributeType.STRING,
            },
            sortKey: {
                name: 'sk',
                type: dynamodb.AttributeType.STRING,
            },
            billingMode: dynamodb.BillingMode.PROVISIONED,
            writeCapacity: 50,
            readCapacity: 25,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        })
    }
}
