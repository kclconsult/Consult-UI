#  'visualizeHRData' and 'VisualizeBPData'  

- 'visualizeHRData' and 'VisualizeBPData' are two Python functions supposed to work on
Amazon Web Services (AWS) Lambda (runtime Python 3.8).

- They acquire data from two tables, 'HR_Artificial_DB' and 'BP_Artificial_DB' respectively, which 
are generated around specific keys via the AWS DynamoDB service.

- Then, leveraging the retrieved information, 'visualizeHRData' and 'VisualizeBPData' plot interactive
graphs representing 4h, 24h and one week's worth of (respectively, Heart Rate and Blood Pressure) data. 
The resulting graphs will be stored in specific AWS S3 buckets.

- Harnessing AWS EventBridge (CloudWatch Events), both functions will be called once every hour.


#  'GetRandomECG'  

- 'GetRandomECG' is a Python function that works on Amazon Web Services (AWS) Lambda (runtime Python 3.10).

- The function randomly acquires one of the ECG plots stored in a specific AWS S3 bucket and moves it to a different S3 bucket.

- Harnessing AWS EventBridge (CloudWatch Events), 'GetRandomECG' will be called once every hour.
