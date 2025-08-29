---
sidebar_position: 60
---

# Cluster Scaling

Once your PostgreSQL cluster is successfully deployed, you may find the need to scale it by adding additional nodes or balancers to handle increased load or redundancy.

## Console (UI)

Cluster scaling is currently supported only through the command line.

:::tip
If you’re interested in having this functionality available through the UI, please consider becoming a [sponsor](/docs/sponsor).
:::

## Command line

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Postgres" label="Postgres" default>

#### Add Postgres Node

To scale your cluster by adding a new PostgreSQL node, follow these steps:

1. **Modify the `inventory` file**: Add the new node's IP address and specify `new_node=true` to indicate that this is a new node.

Example:

```
[master]
10.128.64.140 hostname=pgnode01 postgresql_exists=true

[replica]
10.128.64.142 hostname=pgnode02 postgresql_exists=true
10.128.64.143 hostname=pgnode03 postgresql_exists=true
10.128.64.144 hostname=pgnode04 postgresql_exists=false new_node=true
```

In this example, we add a node with the IP address `10.128.64.144`

2. **Run the playbook**: Execute the `add_pgnode.yml` playbook to add the new node to your cluster.

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.3.2 \
    ansible-playbook add_pgnode.yml
```

:::note
When you run this playbook, the new node will undergo the same preparation process as during the initial cluster deployment. However, unlike the initial setup, all necessary configuration files will be automatically copied from server listed in the "master" group in the inventory file.
:::

  </TabItem>
  <TabItem value="HAProxy" label="HAProxy">

#### Add HAProxy Node

If you’re using HAProxy load balancing (with the `with_haproxy_load_balancing` variable set to `true`), you can add a new balancer node by following these steps:

1. **Modify the `inventory` file**: Add the new balancer node's IP address and specify `new_node=true`

Example:

```
[balancers]
10.128.64.140
10.128.64.142
10.128.64.143
10.128.64.144 new_node=true
```

In this example, we add a balancer node with the IP address `10.128.64.144`

2. **Run the playbook**: Execute the `add_balancer.yml` playbook to add the new balancer node to your cluster.

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.3.2 \
    ansible-playbook add_balancer.yml
```

:::note
When you run this playbook, the new balancer node will be prepared similarly to the initial deployment. However, all necessary configuration files will be copied from the first server listed in the "balancers" group in the inventory file.
:::

  </TabItem>
</Tabs>
