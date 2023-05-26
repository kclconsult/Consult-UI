import matplotlib.pyplot as plt
import mpld3
from mpld3 import plugins
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3
from boto3.dynamodb.conditions import Key, Attr
import re


#retrieve logged patient ID (in the following suppose such ID = 0)
patient_ID = '0'


# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select the HR artificial table
table = dynamodb.Table('HR_Artificial_DB')
#query table filtering for logged patient ID
table_items = table.scan(FilterExpression=Attr('Ppt_ID').eq(patient_ID))
items = table_items['Items']
#retrieve all the 'c40443h4' values as strings and trasform them into integers
hr_values1 = [int(i['c40443h4']) for i in items]
#retrieve all the 'c8867h4' values as strings and trasform them into integers
hr_values2 = [int(i['c8867h4']) for i in items]
#retrieve all the 'c82290h8' values as strings and trasform them into floats
activity_frequency = [float(i['c82290h8']) for i in items]
#retrieve all the 'time' (y/m/d/h/m/s) values
time = [(i['datem'] + ' ' + i['time']) for i in items]


#create pairs of time-values and sort them chronologically (useful for a better plot)
#notice that without this the time string data will not be ordered
def chrono_sort(unordered_time_data, paired_values):
    zipped = zip(unordered_time_data, paired_values)
    sorted_zipped = sorted(zipped)
    #decouple ordered elements
    x = [list(t) for t in zip(*sorted_zipped)]
    sorted_time = x[0]
    sorted_value = x[1]
    return sorted_time, sorted_value

#identify bucket for storing plotted images
s3 = boto3.client('s3')

def lambda_handler(event, context):


        #separate the result of chrono_sort function
        #recall that the non-time values need to be numeric to be plotted correctly
        z, y = chrono_sort(time, hr_values1)
        z, k = chrono_sort(time, hr_values2)
        z, a = chrono_sort(time, activity_frequency)


        ########################################################################
        ######################### Last 4h graph ################################
        ########################################################################


        fig, ax = plt.subplots()
        ax.grid(True, alpha=0.1)


        #set labels for HR (resting) [tooltip]
        labels_HRresting = []
        #consider only last 4H
        for i in range(-4, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], y[i])
            labels_HRresting.append(label)


        #set labels for HR [tooltip2]
        labels_HR = []
        #consider only last 4H
        for i in range(-4, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], k[i])
            labels_HR.append(label)

        #plot
        points = plt.plot(z[-4:], y[-4:], '-o', color='blue', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR (resting)')
        points2 = plt.plot(z[-4:], k[-4:], '-o', color='orange', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR')


        ax.set_title('HR data', size=20)

        #for a better data visualization, prevent displaying x axis
        ax.xaxis.set_tick_params(labelbottom=False)
        ax.set_xticks([])


        # Set legend
        ax.legend(loc='right', bbox_to_anchor=(1.08, 0.26), fancybox=True, shadow=True, ncol=1, framealpha=1)

        plugins.clear(fig)  # clear all plugins from the figure

        #define tooltip plugin
        tooltip = plugins.PointHTMLTooltip(points[0], labels_HRresting, voffset=10, hoffset=10)

        tooltip2 = plugins.PointHTMLTooltip(points2[0], labels_HR, voffset=10, hoffset=10)

        #set interactive_legend elements
        legend_label1 = ''
        legend_label2 = ''

        legend_labels = [legend_label1, legend_label2]

        line_collections = [points, points2]


        #define interactive legend plugin
        interactive_legend = plugins.InteractiveLegendPlugin(line_collections, legend_labels, alpha_unsel=0.5, alpha_over=1.5, start_visible=True)

        #add custom plugins
        plugins.connect(fig, plugins.Reset(), plugins.Zoom(), plugins.BoxZoom(), tooltip, tooltip2, interactive_legend)

        #link graph name with patient_ID
        keyHR4h = patient_ID + 'HR4h_plot.html'

        # Save the plot as an HTML file using mpld3
        html = mpld3.fig_to_html(fig)

        # Upload the HTML file to S3 bucket
        bucket_name = 'matplotnumpybucket'
        s3.put_object(Body=html, Bucket=bucket_name, Key=keyHR4h, ContentType='text/html')




        ########################################################################
        ######################### Last 24h graph ###############################
        ########################################################################



        #verify clean plot
        plt.cla()
        plt.clf()


        fig, ax = plt.subplots()
        ax.grid(True, alpha=0.1)


        #set labels for HR (resting) [tooltip]
        labels_HRresting = []
        #consider only last 24H
        for i in range(-24, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], y[i])
            labels_HRresting.append(label)


        #set labels for HR [tooltip2]
        labels_HR = []
        #consider only last 24H
        for i in range(-24, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], k[i])
            labels_HR.append(label)

        #plot
        points = plt.plot(z[-24:], y[-24:], '-o', color='blue', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR (resting)')
        points2 = plt.plot(z[-24:], k[-24:], '-o', color='orange', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR')


        ax.set_title('HR data', size=20)

         #for a better data visualization, prevent displaying x axis
        ax.xaxis.set_tick_params(labelbottom=False)
        ax.set_xticks([])

        # Set legend
        ax.legend(loc='right', bbox_to_anchor=(1.08, 0.26), fancybox=True, shadow=True, ncol=1, framealpha=1)

        plugins.clear(fig)  # clear all plugins from the figure

        #define tooltip plugin
        tooltip = plugins.PointHTMLTooltip(points[0], labels_HRresting, voffset=10, hoffset=10)

        tooltip2 = plugins.PointHTMLTooltip(points2[0], labels_HR, voffset=10, hoffset=10)


        #set interactive_legend elements
        legend_label1 = ''
        legend_label2 = ''
        legend_labels = [legend_label1, legend_label2]

        line_collections = [points, points2]


        #define interactive legend plugin
        interactive_legend = plugins.InteractiveLegendPlugin(line_collections, legend_labels, alpha_unsel=0.5, alpha_over=1.5, start_visible=True)

        #add custom plugins
        plugins.connect(fig, plugins.Reset(), plugins.Zoom(), plugins.BoxZoom(), tooltip, tooltip2, interactive_legend)

        #link graph name with patient_ID
        keyHR24h = patient_ID + 'HR24h_plot.html'

        # Save the plot as an HTML file using mpld3
        html = mpld3.fig_to_html(fig)

        # Upload the HTML file to S3 bucket
        bucket_name = 'matplotnumpybucket'
        s3.put_object(Body=html, Bucket=bucket_name, Key=keyHR24h, ContentType='text/html')



        ########################################################################
        ######################### Last week graph ##############################
        ########################################################################

       #verify clean plot
        plt.cla()
        plt.clf()


        fig, ax = plt.subplots()
        ax.grid(True, alpha=0.1)


        #set labels for HR (resting) [tooltip]
        labels_HRresting = []
        #consider last week (i.e, up to 168 data item)
        for i in range(-168, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], y[i])
            labels_HRresting.append(label)


        #set labels for HR [tooltip2]
        labels_HR = []
        #consider last week (i.e, up to 168 data item)
        for i in range(-168, 0):
            label = "Time: {0}, HR value: {1}".format(z[i], k[i])
            labels_HR.append(label)

        #plot
        points = plt.plot(z[-168:], y[-168:], '-o', color='blue', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR (resting)')
        points2 = plt.plot(z[-168:], k[-168:], '-o', color='orange', mec='k', ms=6, mew=0.5, alpha=.6, label = 'HR')


        ax.set_title('HR data', size=20)

        #for a better data visualization, prevent displaying x axis
        ax.xaxis.set_tick_params(labelbottom=False)
        ax.set_xticks([])

        # Set legend
        ax.legend(loc='right', bbox_to_anchor=(1.08, 0.26), fancybox=True, shadow=True, ncol=1, framealpha=1)

        plugins.clear(fig)  # clear all plugins from the figure

        #define tooltip plugin
        tooltip = plugins.PointHTMLTooltip(points[0], labels_HRresting, voffset=10, hoffset=10)

        tooltip2 = plugins.PointHTMLTooltip(points2[0], labels_HR, voffset=10, hoffset=10)


        #set interactive_legend elements
        legend_label1 = ''
        legend_label2 = ''
        ##REMOVE ACTIVITY FREQUENCY VISUALIZATION
        legend_labels = [legend_label1, legend_label2]

        line_collections = [points, points2]


        #define interactive legend plugin
        interactive_legend = plugins.InteractiveLegendPlugin(line_collections, legend_labels, alpha_unsel=0.5, alpha_over=1.5, start_visible=True)

        #add custom plugins
        plugins.connect(fig, plugins.Reset(), plugins.Zoom(), plugins.BoxZoom(), tooltip, tooltip2, interactive_legend)

        #link graph name with patient_ID
        keyHRweek = patient_ID + 'HRweek_plot.html'

        # Save the plot as an HTML file using mpld3
        html = mpld3.fig_to_html(fig)

        # Upload the HTML file to S3 bucket
        bucket_name = 'matplotnumpybucket'
        s3.put_object(Body=html, Bucket=bucket_name, Key=keyHRweek, ContentType='text/html')

        return None
