---
sidebar_position: 4
---

# GCP

Google Cloud Platform

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in Google Cloud:

1. GCP VM instances - a virtual machine (with a dedicated data disk), with all cluster components installed and configured.
2. GCP Proxy Network Load Balancer to serve as the entry point for database connections.
3. GCP Bucket, and configured backups using pgBackRest.

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need the service account credentials (in JSON or base64 format) to deploy the PostgreSQL cluster to your Google Cloud account.
See the [official documentation](https://cloud.google.com/iam/docs/keys-create-delete) for instructions on creating a service account key.

:::note
You can either add these credentials in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'Google Cloud' as the destination and choose the deployment region.

<ThemedImage
  alt="deployment-destination"
  sources={{
    light: '/img/deployment-destination-gcp.png',
    dark: '/img/deployment-destination-gcp.dark.png',
  }}
/>

<ThemedImage
  alt="cloud-region"
  sources={{
    light: '/img/cloud-region-gcp.png',
    dark: '/img/cloud-region-gcp.dark.png',
  }}
/>

Select the type of server with the required amount of CPU and RAM.

<ThemedImage
  alt="instance-type"
  sources={{
    light: '/img/instance-type-gcp.png',
    dark: '/img/instance-type-gcp.dark.png',
  }}
/>

Select the number of servers to be created for the PostgreSQL cluster.

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

<ThemedImage
  alt="number-of-instances"
  sources={{
    light: '/img/number-of-instances.png',
    dark: '/img/number-of-instances.dark.png',
  }}
/>

Specify the desired disk size for the database.

<ThemedImage
  alt="data-disk-storage"
  sources={{
    light: '/img/data-disk-storage-gcp.png',
    dark: '/img/data-disk-storage-gcp.dark.png',
  }}
/>

Specify your SSH public key to be able to access the database servers via SSH after deployment.

<ThemedImage
  alt="ssh-public-key"
  sources={{
    light: '/img/ssh-public-key.png',
    dark: '/img/ssh-public-key.dark.png',
  }}
/>

Choose which environment your database cluster belongs to.

<ThemedImage
  alt="environment"
  sources={{
    light: '/img/environment.png',
    dark: '/img/environment.dark.png',
  }}
/>

Specify a name for your cluster.

<ThemedImage
  alt="cluster-name"
  sources={{
    light: '/img/cluster-name.png',
    dark: '/img/cluster-name.dark.png',
  }}
/>

Optionally, specify a description.

<ThemedImage
  alt="description"
  sources={{
    light: '/img/description.png',
    dark: '/img/description.dark.png',
  }}
/>

Select the PostgreSQL version to install.

<ThemedImage
  alt="postgres-version"
  sources={{
    light: '/img/postgres-version.png',
    dark: '/img/postgres-version.dark.png',
  }}
/>

Review the summary and click the "Create Cluster" button.

<ThemedImage
  alt="summary"
  sources={{
    light: '/img/summary-gcp.png',
    dark: '/img/summary-gcp.dark.png',
  }}
  style={{ width: '40%' }}
/>

Wait until deployment is complete. This process takes about 10 to 15 minutes.

:::info
You can see the deployment log in the "Operations" section. To do this, select the relevant event with the "deploy" type and click "Show details" under the Actions tab.
:::

:::tip
After a successful deployment, you can obtain the connection info on the cluster page. To do this, click on the name of your cluster on the "Clusters" page.
:::


<ThemedImage
  alt="сluster"
  sources={{
    light: '/img/сluster.png',
    dark: '/img/сluster.dark.png',
  }}
/>

Example of a cluster page:

<ThemedImage
  alt="cluster-overview"
  sources={{
    light: '/img/cluster-overview.png',
    dark: '/img/cluster-overview.dark.png',
  }}
/>

  </TabItem>
  <TabItem value="command-line" label="Command line">

:::tip
📩 Contact us at info@autobase.tech, and our team will provide you with deployment instructions tailored specifically to your infrastructure, including the most suitable parameters for optimal performance and reliability.
:::

#### 1. Set GCP credentials

Export your GCP service account contents to an environment variable:

```
export GCP_SERVICE_ACCOUNT_CONTENTS='{
  <value>
}'
```

#### 2. Run the Deployment Command

Execute the following command to deploy a PostgreSQL cluster (example):

```
docker run --rm -it \
  --env GCP_SERVICE_ACCOUNT_CONTENTS=${GCP_SERVICE_ACCOUNT_CONTENTS} \
  autobase/automation:2.3.0 \
    ansible-playbook deploy_pgcluster.yml --extra-vars \
      "ansible_user=root \
       cloud_provider='gcp' \
       cloud_load_balancer=ture \
       server_count=3 \
       server_type='n2-standard-4' \
       server_image='projects/ubuntu-os-cloud/global/images/family/ubuntu-2404-lts-amd64' \
       server_location='us-east1' \
       volume_size=100 \
       postgresql_version=17 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

Key Parameters:
- `cloud_provider`: Specifies Google Cloud (GCP) as the provider.
- `cloud_load_balancer`: Adds a GCP Proxy Network Load Balance to the cluster.
- `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
- `server_type`: Type of servers (e.g., 'n2-standard-4' for 4 vCPU 16 GB RAM).
- `server_image`: Operating system image for the servers.
- `server_location`: Server location (e.g., 'us-east1' for South Carolina).
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
