---
sidebar_position: 3
---

# DigitalOcean

DigitalOcean Cloud

**[autobase](https://github.com/vitabaks/autobase)** will automatically set up the following in DigitalOcean:

1. DigitalOcean Droplets - a virtual machine (with a dedicated data disk), with all cluster components installed and configured.
2. DigitalOcean Load Balancer to serve as the entry point for database connections.

:::info
All components are installed within your cloud account.
:::

### Prerequisites

You will need the Personal Access Token to deploy the cluster to your DigitalOcean account.
See the [official documentation](https://docs.digitalocean.com/reference/api/create-personal-access-token/) for instructions on creating an access token.

:::note
You can either add these credentials in advance on the **Settings** page under the **Secrets** tab, or you will be prompted to enter them during the cluster creation process.
:::

### Console (UI)

Select 'DigitalOcean' as the destination and choose the deployment region.

![deployment-destination](/img/deployment-destination-do.png)

![cloud-region](/img/cloud-region-do.png)

Select the type of server with the required amount of CPU and RAM.

![instance-type](/img/instance-type-do.png)

Select the number of servers to be created for the PostgreSQL Cluster.

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

![number-of-instances](/img/number-of-instances.png)

Specify the desired disk size for the database.

![data-disk-storage](/img/data-disk-storage-do.png)

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
  <img src={require('@site/static/img/summary-do.png').default} alt="summary" width="45%"/>
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

---

### Command line

It will be published soon.
