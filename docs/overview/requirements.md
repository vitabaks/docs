---
sidebar_position: 3
---

# Requirements

This page outlines the essential requirements for deploying and managing your PostgreSQL Cluster.

### Console (UI)

For users of the PostgreSQL Cluster Console (UI), the setup is simplified. You only need [Docker](https://docs.docker.com/engine/install/) to run the container. All other dependencies and tools are bundled within the `postgresql_cluster` [image](https://hub.docker.com/repository/docker/vitabaks/postgresql_cluster).

:::note
Ensure that ports 80 (for the UI) and 8080 (for the API) are open to allow access to the Console and its underlying services.
:::

### Command line

When deploying via the command line, ensure that you have the necessary `root` privileges or `sudo` access to manage the servers. \
Additionally, you'll need [Ansible](https://www.ansible.com/how-ansible-works/), a powerful automation tool, to execute the playbook.

If you're using Consul as your DCS (`dcs_type: "consul"`), make sure to install the Consul role requirements on your control node:
```shell
ansible-galaxy install -r roles/consul/requirements.yml
```

### Port requirements

:::info
When deploying to cloud providers (such as AWS, GCP, Azure, DigitalOcean, and Hetzner Cloud) using the Console UI, all necessary ports are automatically configured during the creation of the Firewall/Security Group, controlled by the `cloud_firewall` variable.
:::

List of required TCP ports that must be open for the database cluster:

- `5432` (postgresql)
- `6432` (pgbouncer)
- `8008` (patroni rest api)
- `2379`, `2380` (etcd)

for the scheme "PostgreSQL High-Availability with Load Balancing":

- `5000` (haproxy - (read/write) master)
- `5001` (haproxy - (read only) all replicas)
- `5002` (haproxy - (read only) synchronous replica only)
- `5003` (haproxy - (read only) asynchronous replicas only)
- `7000` (optional, haproxy stats)

for the scheme "PostgreSQL High-Availability with Consul Service Discovery":

- `8300` (Consul Server RPC)
- `8301` (Consul Serf LAN)
- `8302` (Consul Serf WAN)
- `8500` (Consul HTTP API)
- `8600` (Consul DNS server)
