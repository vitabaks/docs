---
sidebar_position: 6
---

# Your Own Machines

Deploy on existing servers

:::info
This method is suitable for deployment on existing servers, whether with another cloud provider or in your own data center.
:::

#### Prerequisites

You will need `root` access or a user with `sudo` privileges to access the servers via SSH. You can use your private SSH key (assuming the corresponding public key has already been added to the servers), or a username and password if password access is enabled on your servers.

See also the [Requirements](../overview/requirements.md) and [Compatibility](../overview/compatibility.md) pages.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

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

  </TabItem>
  <TabItem value="command-line" label="Command line">

:::tip
We also support converting your existing PostgreSQL installation into a high-availability cluster. If you want to upgrade your current PostgreSQL setup to a clustered configuration, simply set `postgresql_exists=true` in the inventory file.
:::note
Please note that during the cluster setup process, your existing PostgreSQL service will be automatically restarted, leading to a brief period of database downtime. Plan this transition accordingly.
:::

1. Edit the inventory file

Specify IP addresses and connection settings for your environment:
- `ansible_user`
- `ansible_ssh_pass` or `ansible_ssh_private_key_file`

```
nano inventory
```

2. Edit the variable file `vars/main.yml`

```
nano vars/main.yml
```

Minimum set of variables: 
- `proxy_env` to download packages in environments without direct internet access (optional)
- `patroni_cluster_name`
- `postgresql_version`
- `postgresql_data_dir`
- `cluster_vip` to provide a single entry point for client access to databases in the cluster (optional)
- `with_haproxy_load_balancing` to enable load balancing (optional)
- `dcs_type` "etcd" (default) or "consul"

:::info
See the vars/[main.yml](https://github.com/vitabaks/autobase/blob/master/automation/vars/main.yml), [system.yml](https://github.com/vitabaks/autobase/blob/master/automation/vars/system.yml) and ([Debian.yml](https://github.com/vitabaks/autobase/blob/master/automation/vars/Debian.yml) or [RedHat.yml](https://github.com/vitabaks/autobase/blob/master/automation/vars/RedHat.yml)) files for more details.
:::

3. Try to connect to hosts

```
ansible all -m ping
```

4. Run playbook:

```
ansible-playbook deploy_pgcluster.yml
```

#### Deploy Cluster with TimescaleDB:

<details>
<summary>Click here to expand...</summary>

To deploy a [TimescaleDB](https://github.com/timescale/timescaledb) HA cluster, set the `enable_timescale` variable:

```
ansible-playbook deploy_pgcluster.yml -e "enable_timescale=true"
```

</details>

#### How to start from scratch:

<details>
<summary>Click here to expand...</summary>

If you need to start from scratch, you can use the `remove_cluster.yml` playbook. Run the following command to remove the specified components:

```
ansible-playbook remove_cluster.yml -e "remove_postgres=true remove_etcd=true"
```

This command will delete the specified components, allowing you to start a new installation.

Available variables:
- `remove_postgres`: stop the PostgreSQL service and remove data.
- `remove_etcd`: stop the ETCD service and remove data.
- `remove_consul`: stop the Consul service and remove data.

:::warning
**Caution:** be careful when running this command in a production environment.
:::

</details>

  </TabItem>
</Tabs>
