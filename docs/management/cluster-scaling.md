---
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Cluster Scaling

This section guides you through scaling your PostgreSQL cluster by adding nodes.

:::tip
You can easily start with a single-node PostgreSQL cluster and scale it out by adding replicas as your workload or high-availability requirements grow.
:::

<Tabs defaultValue="console-ui">
  <TabItem value="console-ui" label="Console (UI)">

To add replicas in the Console UI, open **Clusters**, select the cluster, click **Actions**, and choose **Add replica**.

<Tabs defaultValue="your-own-machines">
  <TabItem value="your-own-machines" label="Your Own Machines">

Specify one or more servers as PostgreSQL replicas. The servers must be reachable over SSH.

For each server, provide the **Hostname** and **IP Address**. The **SSH port** and **Location** fields are optional.

<ThemedImage
  alt="Add replicas on your own machines"
  sources={{
    light: '/img/add-replica-server.png',
    dark: '/img/add-replica-server.dark.png',
  }}
/>

Select **Add replicas** to start the scaling operation.

  </TabItem>
  <TabItem value="clouds" label="Clouds">

:::info
The same scaling method applies to all supported cloud providers: **AWS**, **GCP**, **Azure**, **DigitalOcean**, and **Hetzner Cloud**.
:::

Specify the desired number of **target nodes**

<ThemedImage
  alt="Add replicas using the existing cloud configuration"
  sources={{
    light: '/img/add-replica-clouds.png',
    dark: '/img/add-replica-clouds.dark.png',
  }}
/>

Select **I understand and want to continue**, and click **Add replica**.

  </TabItem>
</Tabs>

Wait for the cluster scaling to complete. You can monitor its progress and view the logs on the **Operations** page.

  </TabItem>
  <TabItem value="command-line" label="Command line">

<Tabs>
  <TabItem value="Your Own Machines" label="Your Own Machines" default>

To scale your cluster by adding a new node, follow these steps:

1. **Modify the `inventory` file**: Add the new node’s IP and set `new_node=true` variable.

Example:

```
[master]
10.128.64.141 hostname=pgnode01

[replica]
10.128.64.142 hostname=pgnode02
10.128.64.143 hostname=pgnode03
10.128.64.144 hostname=pgnode04 new_node=true
```

:::info
In this example, we add a node with the IP address `10.128.64.144`
:::

2. **Run the playbook**: Execute the `add_node.yml` playbook to add the new node to your cluster.

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml
```

:::tip
You can scale PostgreSQL nodes, and DCS cluster (etcd or Consul), as well as HAProxy load balancers (when with_haproxy_load_balancing is set to true).
:::

  </TabItem>
  <TabItem value="AWS" label="AWS">

To scale your cluster by adding a new node, just increase `server_count` variable (e.g., from 3 to 5).

:::note
Specify the path to the private SSH key (its public pair must already be on cluster nodes) using either `ansible_ssh_private_key_file` or `--private-key` option.
:::

Execute the `add_node.yml` playbook to add the new node to your cluster, example:

```
export AWS_ACCESS_KEY_ID=<value>
export AWS_SECRET_ACCESS_KEY=<value>
```

```
docker run --rm -it \
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml --extra-vars \
      "ansible_user=ubuntu \
       ansible_ssh_private_key_file=/root/.ssh/id_rsa \
       cloud_provider='aws' \
       server_count=5 \
       server_type='m7i.xlarge' \
       server_image='ami-034568121cfdea9c3' \
       server_location='us-east-1' \
       volume_size=100 \
       postgresql_version=18 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::info
Autobase will create and configure a new EC2 instances in your AWS account and add it to the cluster.
:::

  </TabItem>
  <TabItem value="GCP" label="GCP">

To scale your cluster by adding a new node, just increase `server_count` variable (e.g., from 3 to 5).

:::note
Specify the path to the private SSH key (its public pair must already be on cluster nodes) using either `ansible_ssh_private_key_file` or `--private-key` option.
:::

Execute the `add_node.yml` playbook to add the new node to your cluster, example:

```
export GCP_SERVICE_ACCOUNT_CONTENTS='{
  <value>
}'
```

```
docker run --rm -it \
  -e GCP_SERVICE_ACCOUNT_CONTENTS=${GCP_SERVICE_ACCOUNT_CONTENTS} \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml --extra-vars \
      "ansible_user=root \
       ansible_ssh_private_key_file=/root/.ssh/id_rsa \
       cloud_provider='gcp' \
       server_count=5 \
       server_type='n2-standard-4' \
       server_image='projects/ubuntu-os-cloud/global/images/family/ubuntu-2404-lts-amd64' \
       server_location='us-east1' \
       volume_size=100 \
       postgresql_version=18 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::info
Autobase will create and configure a new VM instances in your Google Cloud account and add it to the cluster.
:::

  </TabItem>
  <TabItem value="Azure" label="Azure">

To scale your cluster by adding a new node, just increase `server_count` variable (e.g., from 3 to 5).

:::note
Specify the path to the private SSH key (its public pair must already be on cluster nodes) using either `ansible_ssh_private_key_file` or `--private-key` option.
:::

Execute the `add_node.yml` playbook to add the new node to your cluster, example:

```
export AZURE_SUBSCRIPTION_ID=<value>
export AZURE_CLIENT_ID=<value>
export AZURE_SECRET=<value>
export AZURE_TENANT=<value>
```

```
docker run --rm -it \
  -e AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID} \
  -e AZURE_CLIENT_ID=${AZURE_CLIENT_ID} \
  -e AZURE_SECRET=${AZURE_SECRET} \
  -e AZURE_TENANT=${AZURE_TENANT} \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml --extra-vars \
      "ansible_user=azureadmin \
       ansible_ssh_private_key_file=/root/.ssh/id_rsa \
       cloud_provider='azure' \
       server_count=5 \
       server_type='Standard_D4s_v5' \
       server_location='eastus' \
       volume_size=100 \
       postgresql_version=18 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::info
Autobase will create and configure a new virtual machines in your Azure account and add it to the cluster.
:::

  </TabItem>
  <TabItem value="DigitalOcean" label="DigitalOcean">

To scale your cluster by adding a new node, just increase `server_count` variable (e.g., from 3 to 5).

:::note
Specify the path to the private SSH key (its public pair must already be on cluster nodes) using either `ansible_ssh_private_key_file` or `--private-key` option.
:::

Execute the `add_node.yml` playbook to add the new node to your cluster, example:

```
export DO_API_TOKEN=<value>
```

```
docker run --rm -it \
  -e DO_API_TOKEN=${DO_API_TOKEN} \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml --extra-vars \
      "ansible_user=root \
       ansible_ssh_private_key_file=/root/.ssh/id_rsa \
       cloud_provider='digitalocean' \
       server_count=5 \
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

:::info
Autobase will create and configure a new droplets in your DigitalOcean account and add it to the cluster.
:::

  </TabItem>
  <TabItem value="Hetzner" label="Hetzner">

To scale your cluster by adding a new node, just increase `server_count` variable (e.g., from 3 to 5).

:::note
Specify the path to the private SSH key (its public pair must already be on cluster nodes) using either `ansible_ssh_private_key_file` or `--private-key` option.
:::

Execute the `add_node.yml` playbook to add the new node to your cluster, example:

```
export HCLOUD_API_TOKEN=<value>
```

```
docker run --rm -it \
  -e HCLOUD_API_TOKEN=${HCLOUD_API_TOKEN} \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook add_node.yml --extra-vars \
      "ansible_user=root \
       ansible_ssh_private_key_file=/root/.ssh/id_rsa \
       cloud_provider='hetzner' \
       server_count=5 \
       server_type='CCX23' \
       server_image='ubuntu-24.04' \
       server_location='fsn1' \
       volume_size=100 \
       hetzner_object_storage_access_key='YOUR_ACCESS_KEY' \
       hetzner_object_storage_secret_key='YOUR_SECRET_KEY' \
       hetzner_object_storage_region='nbg1' \
       pgbackrest_install=true \
       postgresql_version=18 \
       patroni_cluster_name='postgres-cluster-01' \
       ssh_public_keys='ssh-rsa AAAAB3NzaC1yc2EAAAA******whzcMINzKKCc7AVGbk='"
```

:::info
Autobase will create and configure a new servers in your Hetzner Cloud account and add it to the cluster.
:::

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>
