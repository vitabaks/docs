---
sidebar_position: 5
---

# Hetzner

Hetzner Cloud

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in Hetzner Cloud:

1. Hetzner Servers - a virtual machine (with a dedicated data disk), with all cluster components installed and configured.
2. Hetzner Load Balancer to serve as the entry point for database connections.
3. Hetzner Object Storage (S3 bucket), and configured backups using pgBackRest (_available via command line for now_).

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need an API token to deploy the cluster to your Hetzner Cloud account, and S3 credentials to create Hetzner Object Storage (S3 bucket) for backups.

See the official documentation for instructions: [Generating an API token](https://docs.hetzner.com/cloud/api/getting-started/generating-api-token/), [Generating S3 keys](https://docs.hetzner.com/storage/object-storage/getting-started/generating-s3-keys/).

:::note
You can either add your API token in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'Hetzner' as the destination and choose the deployment region.

<ThemedImage
  alt="deployment-destination"
  sources={{
    light: '/img/deployment-destination-hetzner.png',
    dark: '/img/deployment-destination-hetzner.dark.png',
  }}
/>

<ThemedImage
  alt="cloud-region"
  sources={{
    light: '/img/cloud-region-hetzner.png',
    dark: '/img/cloud-region-hetzner.dark.png',
  }}
/>

Select the type of server with the required amount of CPU and RAM.

<ThemedImage
  alt="instance-type"
  sources={{
    light: '/img/instance-type-hetzner.png',
    dark: '/img/instance-type-hetzner.dark.png',
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
    light: '/img/data-disk-storage-hetzner.png',
    dark: '/img/data-disk-storage-hetzner.dark.png',
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
    light: '/img/summary-hetzner.png',
    dark: '/img/summary-hetzner.dark.png',
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

#### 1. Set Hetzner Cloud API Token

Export your Hetzner Cloud API token to an environment variable:

```
export HCLOUD_API_TOKEN=<value>
```

#### 2. Run the Deployment Command

Execute the following command to deploy a PostgreSQL cluster (example):

```
docker run --rm -it \
  --env HCLOUD_API_TOKEN=${HCLOUD_API_TOKEN} \
  autobase/automation:2.3.0 \
    ansible-playbook deploy_pgcluster.yml --extra-vars \
      "ansible_user=root \
       cloud_provider='hetzner' \
       cloud_load_balancer=true \
       server_count=3 \
       server_type='CCX23' \
       server_image='ubuntu-24.04' \
       server_location='fsn1' \
       volume_size=100 \
       hetzner_object_storage_access_key='YOUR_ACCESS_KEY' \
       hetzner_object_storage_secret_key='YOUR_SECRET_KEY' \
       hetzner_object_storage_region='nbg1' \
       pgbackrest_install=true \
       postgresql_version=17 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::note
Replace `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` with your actual S3 credentials. \
Alternatively, you can remove the `hetzner_object_storage_*` and `pgbackrest_install` variables if you don’t plan to configure backups for your cluster (not recommended for production use).
:::

Key Parameters:
- `cloud_provider`: Specifies Hetzner Cloud as the provider.
- `cloud_load_balancer`: Adds a Hetzner Load Balancer to the cluster.
- `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
- `server_type`: Type of servers (e.g., 'CCX23' for 4 vCPU 16 GB RAM).
- `server_image`: Operating system image for the servers (e.g., ubuntu-24.04).
- `server_location`: Server location (e.g., 'ash' for Ashburn).
- `volume_size`: Disk size (in GB) for the database.
- `postgresql_version`: PostgreSQL version.
- `patroni_cluster_name`: PostgreSQL cluster name.
- `ssh_public_keys`: Your SSH public key to access the database servers after deployment.

Backup Parameters:
- `pgbackrest_install`: Enables backups using [pgBackRest](https://github.com/pgbackrest/pgbackrest). Use `wal_g_install` instead if you prefer [WAL-G](https://github.com/wal-g/wal-g).
- `hetzner_object_storage_name`: Name of the Object Storage (default: patroni_cluster_name-backup).
- `hetzner_object_storage_region`: Region for the S3 bucket (default: server_location). Recommended to use a different region than the database cluster.
- `hetzner_object_storage_access_key`: Object Storage ACCESS KEY (required).
- `hetzner_object_storage_secret_key`: Object Storage SECRET KEY (required).

:::info
See the [default](https://github.com/vitabaks/autobase/tree/master/automation/roles/common/defaults) automation variables for more details, including the list of available [variables](https://github.com/vitabaks/autobase/blob/master/automation/roles/cloud_resources/defaults/main.yml) for cloud resources.
:::

#### 3. Wait until deployment is complete

This process takes about 10 to 15 minutes.

:::tip
After a successful deployment, the connection information can be found in the Ansible log.
:::

  </TabItem>
</Tabs>
