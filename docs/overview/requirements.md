---
sidebar_position: 3
---

# Requirements

### Console (UI)

When using the PostgreSQL Cluster Console (UI), you only need [Docker](https://docs.docker.com/engine/install/) to run the container, all other requirements are already included in the `postgresql_cluster` docker [image](https://hub.docker.com/repository/docker/vitabaks/postgresql_cluster).

### Command line

This playbook requires `root` privileges or `sudo`.

Ansible ([What is Ansible](https://www.ansible.com/how-ansible-works/)?)

If `dcs_type: "consul"`, please install consul role requirements on the control node:

```shell
ansible-galaxy install -r roles/consul/requirements.yml
```

### Port requirements

:::info
When deploying to cloud providers (such as AWS, GCP, Azure, DigitalOcean, and Hetzner Cloud) using the Console UI, all necessary ports are automatically configured when creating a Firewall/Security Group (controlled by the `cloud_firewall` variable).
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
