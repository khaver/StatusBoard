# StatusBoard
StatusBoard server and website for Raspberry Pi

Supports POST requests containing Jenkins job build XML to /StatusBoard
To add support to a Job have the following run as a Post build task

```bash
#!/bin/bash
RESULTS=$(curl -X POST "$JENKINS_URL/job/stratum-adp%20jenkins-status%20test/$BUILD_NUMBER/api/json")
echo "$RESULTS"
curl -H "Content-Type: application/json" -X POST  --data-binary "$RESULTS" khaver.mynetgear.com:3000/statusBoard
```

# API Endpoints
| Endpoint       | Description                                   |
| -------------- | --------------------------------------------- |
| `/Statuses`    | Retrieves list of status objects for all jobs |
| `/statusBoard` | Accepts POST request of build JSON object     |
