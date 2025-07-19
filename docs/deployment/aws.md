---
sidebar_position: 1
---

# AWS

Amazon Web Services

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in Amazon Web Services (AWS):

1. AWS EC2 Instances - a virtual machine (with a dedicated data disk), with all cluster components installed and configured.
2. AWS Elastic Load Balancer (ELB) to serve as the entry point for database connections.
3. AWS S3 Bucket, and configured backups using pgBackRest.

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need the access key (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY) to deploy the PostgreSQL cluster to your AWS account.
See the [official documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for instructions on creating an access key.

:::note
You can either add these credentials in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'AWS' as the destination and choose the deployment region.

![deployment-destination](/img/deployment-destination-aws.png)

![cloud-region](/img/cloud-region-aws.png)

Select the type of server with the required amount of CPU and RAM.

![instance-type](/img/instance-type-aws.png)

Select the number of servers to be created for the PostgreSQL cluster.

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

![number-of-instances](/img/number-of-instances.png)

Specify the desired disk size for the database.

![data-disk-storage](/img/data-disk-storage-aws.png)

Specify your SSH public key to be able to access the database servers via SSH after deployment.

![ssh-public-key](/img/ssh-public-key.png)

Choose which environment your database cluster belongs to.

![environment](/img/environment.png)

Specify a name for your cluster.

![cluster-name](/img/cluster-name.png)

Optionally, specify a description.

![description](/img/description.png)

Select the PostgreSQL version to install.

![postgres-version](/img/postgres-version.png)

Review the summary and click the "CREATE CLUSTER" button.

<p align="left">
  <img src={require('@site/static/img/summary-aws.png').default} alt="summary" width="45%"/>
</p>

Wait until deployment is complete. This process takes about 10 to 15 minutes.

:::info
You can see the deployment log in the "Operations" section. To do this, select the relevant event with the "deploy" type and click "Show details" under the Actions tab.
:::

:::tip
After a successful deployment, you can obtain the connection info on the cluster page. To do this, click on the name of your cluster on the "Clusters" page.
:::

![сluster](/img/сluster.png)

Example of a cluster page:

![cluster-overview](/img/cluster-overview.png)


  </TabItem>
  <TabItem value="command-line" label="Command line">

:::tip
📩 Contact us at info@autobase.tech, and our team will provide you with deployment instructions tailored specifically to your infrastructure, including the most suitable parameters for optimal performance and reliability.
:::

#### 1. Set AWS credentials

Export your AWS access key to an environment variable:

```
export AWS_ACCESS_KEY_ID=<value>
export AWS_SECRET_ACCESS_KEY=<value>
```

#### 2. Run the Deployment Command

Execute the following command to deploy a PostgreSQL cluster (example):

```
docker run --rm -it \
  --env AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  --env AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  autobase/automation:2.3.0 \
    ansible-playbook deploy_pgcluster.yml --extra-vars \
      "ansible_user=ubuntu \
       cloud_provider='aws' \
       cloud_load_balancer=true \
       server_count=3 \
       server_type='m6i.xlarge' \
       server_image='ami-063fb82b183efe67d' \
       server_location='us-east-1' \
       volume_size=100 \
       postgresql_version=17 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

Key Parameters:
- `cloud_provider`: Specifies Amazon Web Services (AWS) as the provider.
- `cloud_load_balancer`: Adds a AWS Elastic Load Balancer (ELB) to the cluster.
- `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
- `server_type`: Type of servers (e.g., 'm6i.xlarge' for 4 vCPU 16 GB RAM).
- `server_image`: Operating system image for the servers (e.g., 'ami-063fb82b183efe67d' for Ubuntu 24.04).
- `server_location`: Server location (e.g., 'us-east-1' for US East N. Virginia).
- `volume_size`: Disk size (in GB) for the database.
- `postgresql_version`: PostgreSQL version.
- `patroni_cluster_name`: PostgreSQL cluster name.
- `ssh_public_keys`: Your SSH public key to access the database servers after deployment.

:::note
See the [default](https://github.com/vitabaks/autobase/tree/master/automation/roles/common/defaults) automation variables for more details, including the list of available [variables](https://github.com/vitabaks/autobase/blob/master/automation/roles/cloud_resources/defaults/main.yml) for cloud resources.
:::

#### 3. Wait until deployment is complete

This process takes about 10 to 15 minutes.

:::info
After a successful deployment, the connection information can be found in the Ansible log.
:::

  </TabItem>
</Tabs>
