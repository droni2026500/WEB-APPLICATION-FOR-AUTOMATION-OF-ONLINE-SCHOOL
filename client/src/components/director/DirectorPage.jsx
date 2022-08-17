import React from 'react';
import {observer} from "mobx-react-lite";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./director.css"

const DirectorPage = () => {
    return (
        <div>
            <PowerBIEmbed
                embedConfig = {{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: '30110f05-6972-405e-b6e8-704062f6678f',
                    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=30110f05-6972-405e-b6e8-704062f6678f&ctid=bf435bf7-4d0b-41af-aec1-238e41c88d3b&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWdlcm1hbnktd2VzdC1jZW50cmFsLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmY0MzViZjctNGQwYi00MWFmLWFlYzEtMjM4ZTQxYzg4ZDNiLyIsImlhdCI6MTY1NjQ2MjI5MywibmJmIjoxNjU2NDYyMjkzLCJleHAiOjE2NTY0NjcwOTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFmeWs4L3lKWDVVcitrZTVxRmV3YVkwQzc2NSt0WVF1WnJ0elFzNGkxTExMSWdqVGYzcHdoSHNmYWxta1BrNmFWV0IxQnhUZ21CRXQ2STFxMVlMRnppWlUvZ2ptekFqQjVwWCtGU3FGMDQyST0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJBbnRpcG92IiwiZ2l2ZW5fbmFtZSI6IkFuZHJleSIsImlwYWRkciI6IjQ2LjM5LjUzLjEwNCIsIm5hbWUiOiJBbmRyZXkgQW50aXBvdiIsIm9pZCI6ImMyYTY0NWNmLTVhYmQtNDkxYS1iMmUxLTY2OTEzZTI2MzVkOSIsInB1aWQiOiIxMDAzMjAwMUZFQ0I3NEU2IiwicmgiOiIwLkFYa0E5MXREdnd0TnIwR3V3U09PUWNpTk93a0FBQUFBQUFBQXdBQUFBQUFBQUFDVUFOUS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJ3R2ZzVHRyOTVab0lsQ1hPNGdtc1phV3ZNVENsYThqaXJVSUVWRjdhSzdRIiwidGlkIjoiYmY0MzViZjctNGQwYi00MWFmLWFlYzEtMjM4ZTQxYzg4ZDNiIiwidW5pcXVlX25hbWUiOiJhLmFudGlwb3ZAcG9saW5hLWVkdWNhdGlvbi5ydSIsInVwbiI6ImEuYW50aXBvdkBwb2xpbmEtZWR1Y2F0aW9uLnJ1IiwidXRpIjoibEctWVVSOS1qMHUtaDVwaUxHY0RBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.uRxCOgLMKRhHkzwfAc01Z3GfL448qH9BZaamI7WPU5cv4KcXSv1_ZOYjR3FtBgxakQoY4cs4w2il0RqR3P-4wfgoKHqN0JWsXfHiaaorc-92Xb4V7P22xDrUFXq5kPX3jUnlDOVHWVzCus2gdAvwCPxjXZ-tf96W7aCkwYYUqEdJTTKnNbizZcW-AI_EFLrHRKR2s06ccuUO1LgkM_QjMq9_nabSHI5XZX0_AlzWXhPJc-1B6sDfPx9WSXpRyPuoBATFs2Rg7r-zO-l-WTsiT78_loYNtGDfRCvZLfM6vpq6eA55xDJSRFBi2Rt8HrEuMyrmP_l61TilaRY-brFfrw',
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false
                            }
                        },
                        background: models.BackgroundType.Transparent,
                    }
                }}

                eventHandlers = {
                    new Map([
                        ['loaded', function () {console.log('Report loaded');}],
                        ['rendered', function () {console.log('Report rendered');}],
                        ['error', function (event) {console.log(event.detail);}]
                    ])
                }

                cssClassName = { "power-bi-container" }

                getEmbeddedComponent = { (embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
        </div>

    );
};

export default observer(DirectorPage);