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
📩 Contact us at info@autobase.tech, and our team will provide you with deployment instructions tailored specifically to your infrastructure, including the most suitable parameters for optimal performance and reliability.
:::

#### 1. Prepare the inventory file

```
curl -fsSL https://raw.githubusercontent.com/vitabaks/autobase/refs/tags/2.2.0/automation/inventory \
  --output ./inventory
```

Specify private IP addresses (not hostnames) and appropriate connection settings for your environment, such as ansible_user, ansible_ssh_pass, or ansible_ssh_private_key_file.

```
nano ./inventory
```

#### 2. Prepare the variables file

Refer to the default [variables](https://github.com/vitabaks/autobase/tree/2.2.0/automation/vars) for all configurable options. You can override them in your vars.yml file.

```
nano ./vars.yml
```

#### 3. Run the deployment command

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/autobase/inventory \
  -v $PWD/inventory:/autobase/inventory \
  -v $PWD/vars.yml:/vars.yml \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.2.0 \
    ansible-playbook deploy_pgcluster.yml -e "@/vars.yml"
```

Alternatively:

<details>
<summary>Use the source code</summary>

1. Edit the inventory file

```
nano inventory
```

2. Edit the variable files

```
nano vars/main.yml
```

3. Try to connect to hosts

```
ansible all -m ping
```

4. Run playbook:

```
ansible-playbook deploy_pgcluster.yml
```

</details>

:::tip
After a successful deployment, the connection information can be found in the Ansible log.
:::

#### How to start from scratch:

If you need to start from scratch, you can use the `remove_cluster.yml` playbook. Run the following command to remove the specified components:

```
ansible-playbook remove_cluster.yml -e "remove_postgres=true remove_etcd=true"
```

This command will delete the specified components, allowing you to start a new installation.

Available variables:
- `remove_postgres`: stop the PostgreSQL service and remove data.
- `remove_etcd`: stop the ETCD service and remove data.
- `remove_consul`: stop the Consul service and remove data.

**Caution:** be careful when running this command in a production environment.

:::info
We also support converting your existing PostgreSQL installation into a high-availability cluster. If you want to upgrade your current PostgreSQL setup to a clustered configuration, simply set `postgresql_exists=true` in the inventory file.
:::note
Please note that during the cluster setup process, your existing PostgreSQL service will be automatically restarted, leading to a brief period of database downtime. Plan this transition accordingly.
:::

  </TabItem>
</Tabs>
