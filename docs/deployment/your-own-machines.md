---
sidebar_position: 6
---

# Your Own Machines

Deploy on existing servers

:::info
This method is suitable for deployment on existing servers, whether with another cloud provider or in your own data center.
:::

### Prerequisites

You will need `root` access or a user with `sudo` privileges to access the servers via SSH. You can use your private SSH key (assuming the corresponding public key has already been added to the servers), or a username and password if password access is enabled on your servers.

See also the [Requirements](../overview/requirements.md) and [Compatibility](../overview/compatibility.md) pages.

### Console (UI)

Select 'Your Own Machines' in the deployment destination.

![deployment-destination](/img/deployment-destination-server.png)

Specify the name and IP addresses of your servers.

:::note
Use **private** IP addresses so that the cluster does not listen a public IP.
:::

Example:

![database-servers](/img/database-servers.png)

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

Select authentication method.

![authentication-method](/img/authentication-method.png)

Optionally, specify an IP address to provide a single entry point for client access to databases in the cluster.

Example:

![cluster-vip](/img/cluster-vip.png)

:::info
This must be an IP address that is currently unused on your network. The address will be assigned to the cluster after deployment.
:::

:::warning
Not for cloud environments. Because VIP-based solutions like `keepalived` or `vip-manager` may not works in such environments.
:::

Optionally, check the box for "HAProxy load balancer".

![haproxy-load-balancer](/img/haproxy-load-balancer.png)

:::tip
This feature supports load balancing for read operations, facilitating effective scale-out strategies through the use of read-only replicas.
See the details on the [Architecture](https://postgresql-cluster.org/overview/architecture#2-postgresql-high-availability-with-load-balancing) page
:::

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
  <img src={require('@site/static/img/summary-server.png').default} alt="summary" width="45%"/>
</p>

Wait until deployment is complete. This process takes about 10 minutes.

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
