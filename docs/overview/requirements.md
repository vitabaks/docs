---
sidebar_position: 3
---

# Requirements

This page outlines the essential requirements for deploying and managing your PostgreSQL cluster.

### Console (UI)

For users of the Autobase Console (UI), the setup is simplified. You only need [Docker](https://docs.docker.com/engine/install/) to run the container. All other dependencies and tools are bundled within the `autobase/automation` [image](https://hub.docker.com/r/autobase/automation).

:::note
Ensure that ports 80 and 443 are open to allow access to the Console UI.
:::

### Command line

All dependencies and source code are bundled into the `autobase/automation` docker image.

You will need `root` access or a user with `sudo` privileges to access the servers via SSH. You can use your private SSH key (assuming the corresponding public key has already been added to the servers), or a username and password if password access is enabled on your servers.

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
