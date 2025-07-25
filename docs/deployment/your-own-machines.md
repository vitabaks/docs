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
import ThemedImage from '@theme/ThemedImage';

<Tabs>
  <TabItem value="console-ui" label="Console (UI)" default>

Select 'Your Own Machines' in the deployment destination.

<ThemedImage
  alt="deployment-destination"
  sources={{
    light: '/img/deployment-destination-server.png',
    dark: '/img/deployment-destination-server.dark.png',
  }}
/>

Specify the name and IP addresses of your servers. Example:

<ThemedImage
  alt="database-servers"
  sources={{
    light: '/img/database-servers.png',
    dark: '/img/database-servers.dark.png',
  }}
/>

:::warning
Please note that at least 3 servers are required to ensure high availability.
:::

Select authentication method.

<ThemedImage
  alt="authentication-method"
  sources={{
    light: '/img/authentication-method.png',
    dark: '/img/authentication-method.dark.png',
  }}
/>

Optionally, specify an IP address to provide a single entry point for client access to databases in the cluster. Example:

<ThemedImage
  alt="cluster-vip"
  sources={{
    light: '/img/cluster-vip.png',
    dark: '/img/cluster-vip.dark.png',
  }}
/>

:::info
This must be an IP address that is currently unused on your network. The address will be assigned to the cluster after deployment.
:::

:::warning
Not for cloud environments. Because VIP-based solutions like `keepalived` or `vip-manager` may not works in such environments.
:::

Optionally, check the box for "HAProxy load balancer".

<ThemedImage
  alt="haproxy-load-balancer"
  sources={{
    light: '/img/haproxy-load-balancer.png',
    dark: '/img/haproxy-load-balancer.dark.png',
  }}
/>

:::tip
This feature supports load balancing for read operations, facilitating effective scale-out strategies through the use of read-only replicas.
See the details on the [Architecture](https://postgresql-cluster.org/overview/architecture#2-postgresql-high-availability-with-load-balancing) page
:::

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
    light: '/img/summary-server.png',
    dark: '/img/summary-server.dark.png',
  }}
  style={{ width: '40%' }}
/>

Wait until deployment is complete. This process takes about 10 minutes.

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

#### 1. Prepare your inventory file

```
curl -fsSL https://raw.githubusercontent.com/vitabaks/autobase/refs/tags/2.3.0/automation/inventory \
  --output ./inventory
```

Specify private IP addresses (not hostnames) and appropriate connection settings for your environment, such as ansible_user, ansible_ssh_pass, or ansible_ssh_private_key_file.

```
nano ./inventory
```

#### 2. Prepare your variables file

Refer to the default [variables](https://github.com/vitabaks/autobase/tree/2.3.0/automation/vars) for all configurable options. To override defaults, copy the relevant variables into your vars file.

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
  autobase/automation:2.3.0 \
    ansible-playbook deploy_pgcluster.yml -e "@/vars.yml"
```

Alternatively, you can use [Ansible Collection](https://github.com/vitabaks/autobase/blob/master/automation/README.md)

#### 4. Wait until deployment is complete

This process takes about 10 to 15 minutes.

:::tip
After a successful deployment, the connection information can be found in the Ansible log.
:::

#### How to start from scratch:

If you need to start from scratch, you can use the `remove_cluster.yml` playbook.

<details>
<summary>Click here to expand...</summary>

Run the following command to remove the specified components:

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

:::info
We also support converting your existing PostgreSQL installation into a high-availability cluster. If you want to upgrade your current PostgreSQL setup to a clustered configuration, simply set `postgresql_exists=true` in the inventory file.
:::note
Please note that during the cluster setup process, your existing PostgreSQL service will be automatically restarted, leading to a brief period of database downtime. Plan this transition accordingly.
:::

  </TabItem>
</Tabs>
