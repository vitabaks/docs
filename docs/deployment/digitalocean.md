---
sidebar_position: 3
---

# DigitalOcean

DigitalOcean Cloud

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in DigitalOcean:

1. DigitalOcean Droplets - a virtual machine (with a dedicated data disk), with all cluster components installed and configured.
2. DigitalOcean Load Balancer to serve as the entry point for database connections.
3. DigitalOcean Spaces Object Storage, and configured backups using pgBackRest (_available via command line for now_).

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need the Personal Access Token to deploy the cluster to your DigitalOcean account, and S3 credentials to create Spaces Object Storage (S3 bucket) for backups.

See the official documentation for instructions: [How to Create a Personal Access Token](https://docs.digitalocean.com/reference/api/create-personal-access-token/), [How to Manage Access Keys](https://docs.digitalocean.com/products/spaces/how-to/manage-access/).


:::note
You can either add access token in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'DigitalOcean' as the destination and choose the deployment region.

<ThemedImage
  alt="deployment-destination"
  sources={{
    light: '/img/deployment-destination-do.png',
    dark: '/img/deployment-destination-do.dark.png',
  }}
/>

<ThemedImage
  alt="cloud-region"
  sources={{
    light: '/img/cloud-region-do.png',
    dark: '/img/cloud-region-do.dark.png',
  }}
/>

Select the type of server with the required amount of CPU and RAM.

<ThemedImage
  alt="instance-type"
  sources={{
    light: '/img/instance-type-do.png',
    dark: '/img/instance-type-do.dark.png',
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
    light: '/img/data-disk-storage-do.png',
    dark: '/img/data-disk-storage-do.dark.png',
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
    light: '/img/summary-do.png',
    dark: '/img/summary-do.dark.png',
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

#### 1. Set DigitalOcean API Token

Export your DigitalOcean API token to an environment variable:

```
export DO_API_TOKEN=<value>
```

#### 2. Run the Deployment Command

Execute the following command to deploy a PostgreSQL cluster (example):

```
docker run --rm -it \
  --env DO_API_TOKEN=${DO_API_TOKEN} \
  autobase/automation:2.4.0 \
    ansible-playbook deploy_pgcluster.yml --extra-vars \
      "ansible_user=root \
       cloud_provider='digitalocean' \
       cloud_load_balancer=true \
       server_count=3 \
       server_type='g-4vcpu-16gb' \
       server_image='ubuntu-24-04-x64' \
       server_location='nyc1' \
       volume_size=100 \
       AWS_ACCESS_KEY_ID='YOUR_ACCESS_KEY' \
       AWS_SECRET_ACCESS_KEY='YOUR_SECRET_KEY' \
       digital_ocean_spaces_region='nyc3' \
       pgbackrest_install=true \
       postgresql_version=18 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::note
Replace `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` with your actual S3 credentials.

Alternatively, you can remove the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `digital_ocean_spaces_*`, and `pgbackrest_install` variables if you don’t plan to configure backups for your cluster (not recommended for production use).
:::

Key Parameters:
- `cloud_provider`: Specifies DigitalOcean as the provider.
- `cloud_load_balancer`: Adds a DigitalOcean Load Balancer to the cluster.
- `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
- `server_type`: Type of servers (e.g., 'g-4vcpu-16gb' for 4 vCPU 16 GB RAM).
- `server_image`: Operating system image for the servers (e.g., ubuntu-24-04-x64).
- `server_location`: Server location (e.g., 'nyc1' for New York).
- `volume_size`: Disk size (in GB) for the database.
- `postgresql_version`: PostgreSQL version.
- `patroni_cluster_name`: PostgreSQL cluster name.
- `ssh_public_keys`: Your SSH public key to access the database servers after deployment.

Backup Parameters:
- `pgbackrest_install`: Enables backups using [pgBackRest](https://github.com/pgbackrest/pgbackrest). Use `wal_g_install` instead if you prefer [WAL-G](https://github.com/wal-g/wal-g).
- `digital_ocean_spaces_name`: Name of the Spaces Object Storage (default: patroni_cluster_name-backup).
- `digital_ocean_spaces_region`: Region for the S3 bucket (default: server_location). Recommended to use a different region than the database cluster.
- `AWS_ACCESS_KEY_ID`: Spaces access key (required).
- `AWS_SECRET_ACCESS_KEY`: Spaces secret keys (required).

:::info
See the [default](https://github.com/vitabaks/autobase/tree/2.4.0/automation/roles/common/defaults/main.yml) automation variables for more details, including the list of available [variables](https://github.com/vitabaks/autobase/blob/2.4.0/automation/roles/cloud_resources/defaults/main.yml) for cloud resources.
:::

#### 3. Wait until deployment is complete

This process takes about 10 to 15 minutes.

:::tip
After a successful deployment, the connection information can be found in the Ansible log.
:::

  </TabItem>
</Tabs>
