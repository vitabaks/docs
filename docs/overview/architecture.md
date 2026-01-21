---
sidebar_position: 1
---

# Architecture

import ThemedImage from '@theme/ThemedImage';

<ThemedImage
  alt="postgresql-cluster-scheme"
  sources={{
    light: '/img/postgresql_cluster.png',
    dark: '/img/postgresql_cluster.dark_mode.png',
  }}
/>

You have three schemes available for deployment:

### 1. PostgreSQL High-Availability only

This is simple scheme without load balancing.

#### Components:

- [**Patroni**](https://github.com/zalando/patroni) is a template for you to create your own customized, high-availability solution using Python and - for maximum accessibility - a distributed configuration store like ZooKeeper, etcd, Consul or Kubernetes. Used for automate the management of PostgreSQL instances and auto failover.

- [**etcd**](https://github.com/etcd-io/etcd) is a distributed reliable key-value store for the most critical data of a distributed system. etcd is written in Go and uses the [Raft](https://raft.github.io/) consensus algorithm to manage a highly-available replicated log. It is used by Patroni to store information about the status of the cluster and PostgreSQL configuration parameters. [What is Distributed Consensus?](http://thesecretlivesofdata.com/raft/)

- [**vip-manager**](https://github.com/cybertec-postgresql/vip-manager) (_optional, if the `cluster_vip` variable is specified_) is a service that gets started on all cluster nodes and connects to the DCS. If the local node owns the leader-key, vip-manager starts the configured VIP. In case of a failover, vip-manager removes the VIP on the old leader and the corresponding service on the new leader starts it there. Used to provide a single entry point (VIP) for database access. Not available for cloud environments.

- [**PgBouncer**](https://pgbouncer.github.io/features.html) (optional, if the `pgbouncer_install` variable is `true`) is a connection pooler for PostgreSQL.

### 2. PostgreSQL High-Availability with Load Balancing

This scheme enables load distribution for read operations and also allows for scaling out the cluster with read-only replicas.

When deploying to cloud providers such as AWS, GCP, Azure, DigitalOcean, and Hetzner Cloud, a cloud load balancer is automatically created by default to provide a single entry point to the database (controlled by the `cloud_load_balancer` variable).

For non-cloud environments, such as when deploying on Your Own Machines, the HAProxy load balancer is available for use. To enable it, set `with_haproxy_load_balancing: true` variable.

:::note
Your application must have support sending read requests to a custom address/port.

List of ports when using HAProxy:
- port 5000 (read / write) master
- port 5001 (read only) all replicas
- port 5002 (read only) synchronous replica only
- port 5003 (read only) asynchronous replicas only
:::

#### Components of HAProxy load balancing:

- [**HAProxy**](http://www.haproxy.org/) is a free, very fast and reliable solution offering high availability, load balancing, and proxying for TCP and HTTP-based applications. 

- [**confd**](https://github.com/kelseyhightower/confd) manage local application configuration files using templates and data from etcd or consul. Used to automate HAProxy configuration file management.

- [**Keepalived**](https://github.com/acassen/keepalived)  (_optional, if the `cluster_vip` variable is specified_) provides a virtual high-available IP address (VIP) and single entry point for databases access.
Implementing VRRP (Virtual Router Redundancy Protocol) for Linux. In our configuration keepalived checks the status of the HAProxy service and in case of a failure delegates the VIP to another server in the cluster. Not available for cloud environments.

### 3. PostgreSQL High-Availability with Consul Service Discovery

:::tip
To use this scheme, specify `dcs_type: consul` variable.
:::

This scheme is suitable for master-only access and for load balancing (using DNS) for reading across replicas. Consul [Service Discovery](https://developer.hashicorp.com/consul/docs/concepts/service-discovery) with [DNS resolving ](https://developer.hashicorp.com/consul/docs/discovery/dns) is used as a client access point to the database.

Client access point (example):

- `master.postgres-cluster.service.consul`
- `replica.postgres-cluster.service.consul`

Besides, it can be useful for a distributed cluster across different data centers. We can specify in advance which data center the database server is located in and then use this for applications running in the same data center. 

Example: `replica.postgres-cluster.service.dc1.consul`, `replica.postgres-cluster.service.dc2.consul`

It requires the installation of a consul in client mode on each application server for service DNS resolution (or use [forward DNS](https://developer.hashicorp.com/consul/tutorials/networking/dns-forwarding?utm_source=docs) to the remote consul server instead of installing a local consul client).
