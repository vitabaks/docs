---
sidebar_position: 4
---

# GCP

Google Cloud Platform

The **[postgresql_cluster](https://github.com/vitabaks/postgresql_cluster)** will automatically set up the following in Google Cloud:

1. A virtual machine and disk for your database.
2. A cloud load balancer to serve as the entry point for connecting to the database.
3. A storage bucket, along with configuration for automated backups using pgBackRest.

:::info
All components are installed within your cloud account.
:::

### Prerequisites

You will need the service account credentials (in JSON or base64 format) to deploy the PostgreSQL cluster to your Google Cloud account.
See the [official documentation](https://cloud.google.com/iam/docs/keys-create-delete) for instructions on creating a service account key.

### Console (UI)

Select 'Google Cloud' as the destination and choose the deployment region.

![deployment-destination](/img/deployment-destination-gcp.png)

![cloud-region](/img/cloud-region-gcp.png)

Select the type of server with the required amount of CPU and RAM.

![instance-type](/img/instance-type-gcp.png)

Select the number of servers to be created for the PostgreSQL cluster.

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

![number-of-instances](/img/number-of-instances.png)

Specify the desired disk size for the database.

![data-disk-storage](/img/data-disk-storage.png)

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

<img src="/img/summary-gcp.png" alt="summary" style={{ width: '45%' }} />

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
