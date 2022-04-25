import * as cdk from 'aws-cdk-lib'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import { Construct } from 'constructs'

export class DashboardResources {
    public static CreateDashboardResources(scope: Construct) {
        const dashboard = new cloudwatch.Dashboard(
            scope,
            'RythmOperationsDashboard',
            {
                dashboardName: 'rythm-operations',
            }
        )

        dashboard.addWidgets(
            this.buildWidget('AWS/DynamoDB', 'ProvisionedReadCapacityUnits'),
            this.buildWidget('AWS/DynamoDB', 'ConsumedWriteCapacityUnits')
        )
    }

    public static buildWidget(
        namespace: string,
        metricName: string,
        statistic: string = 'avg'
    ): cloudwatch.GraphWidget {
        return new cloudwatch.GraphWidget({
            title: metricName,
            left: [
                new cloudwatch.Metric({
                    dimensionsMap: {
                        TableName: 'rythm-data',
                    },
                    namespace: namespace,
                    metricName: metricName,
                    statistic: statistic,
                }),
            ],
        })
    }
}
