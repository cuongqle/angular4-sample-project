import {Component} from "@angular/core";
const AWS = require('aws-sdk/dist/aws-sdk-react-native');

@Component({
    template: `
        <h1>Hello World!</h1>

        <form  (ngSubmit)="onSubmit(f)" #f="ngForm" action="">
            <input type="file" (change)="fileEvent($event)" />
        </form>
        
        <iframe src="https://drive.google.com/embeddedfolderview?id=0B4lLULfKsEl9REFIMS1uUWZYX2M#list" style="width:100%; height:600px; border:0;"></iframe>
    `,
    styles: ['h1 { color: blue; }']
})
export default class HelloWorldComponent {

    private s3_access_key =process.env.S3_ACCESS_KEY || "AKIAJPF3LG22JOYNUEUQ";
    private s3_secret_access_key = process.env.S3_SECRET_ACCESS_KEY || "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";
    private s3_bucket = process.env.S3_BUCKET_NAME || "testing-pictures-bertelsmann";
    private s3_region = process.env.S3_BUCKET_REGION || "eu-west-1";

    constructor() {
        AWS.config.accessKeyId = this.s3_access_key;
        AWS.config.secretAccessKey = this.s3_secret_access_key;
        AWS.config.region = this.s3_region;
    }

    fileEvent(event: any) {
        const file = event.target.files[0];
        const params = {Key: file.name, Body: file};
        const bucket = new AWS.S3({params: {Bucket: this.s3_bucket}});
        bucket.upload(params, function (err, data) {
            console.log(data.Location);
        });
    }

}