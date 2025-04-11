---
sidebar_position: 2
---

# Azure

Microsoft Azure

**[Autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in Azure:

1. Azure Virtual Machines (with a dedicated data disk), with all cluster components installed and configured.
2. Azure Load Balancer to serve as the entry point for database connections.
3. Azure Blob Storage, and configured backups using pgBackRest.

:::info
All components are installed within your cloud account.
:::

#### Prerequisites

You will need the necessary details (AZURE_SUBSCRIPTION_ID, AZURE_CLIENT_ID, AZURE_SECRET, AZURE_TENANT) to deploy the cluster to your Azure account.
See the [official documentation](https://learn.microsoft.com/en-us/azure/developer/ansible/create-ansible-service-principal?tabs=azure-cli) for instructions on creating an service principal.

:::note
You can either add these credentials in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'Azure' as the destination and choose the deployment region.

![deployment-destination](/img/deployment-destination-azure.png)

![cloud-region](/img/cloud-region-azure.png)

Select the type of server with the required amount of CPU and RAM.

![instance-type](/img/instance-type-azure.png)

Select the number of servers to be created for the PostgreSQL cluster.

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

![number-of-instances](/img/number-of-instances.png)

Specify the desired disk size for the database.

![data-disk-storage](/img/data-disk-storage-azure.png)

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
  <img src={require('@site/static/img/summary-azure.png').default} alt="summary" width="45%"/>
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

#### 1. Set Azure credentials

Export your Azure service principal credentials to an environment variable:

```
export AZURE_SUBSCRIPTION_ID=<value>
export AZURE_CLIENT_ID=<value>
export AZURE_SECRET=<value>
export AZURE_TENANT=<value>
```

#### 2. Run the Deployment Command

Execute the following command to deploy a PostgreSQL cluster (example):

```
docker run --rm -it \
  --env AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID} \
  --env AZURE_CLIENT_ID=${AZURE_CLIENT_ID} \
  --env AZURE_SECRET=${AZURE_SECRET} \
  --env AZURE_TENANT=${AZURE_TENANT} \
  autobase/automation:2.2.0 \
    ansible-playbook deploy_pgcluster.yml --extra-vars \
      "ansible_user=azureadmin \
       cloud_provider='azure' \
       cloud_load_balancer=true \
       server_count=3 \
       server_type='Standard_D4s_v5' \
       server_location='eastus' \
       volume_size=100 \
       postgresql_version=17 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

Key Parameters:
- `cloud_provider`: Specifies Azure as the provider.
- `cloud_load_balancer`: Adds a Azure Load Balancer to the cluster.
- `server_count`: Number of servers in the cluster (at least 3 servers are needed for high availability).
- `server_type`: Type of servers (e.g., 'Standard_D4s_v5' for 4 vCPU 16 GB RAM).
- `server_location`: Server location (e.g., 'eastus' for East US Virginia).
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
