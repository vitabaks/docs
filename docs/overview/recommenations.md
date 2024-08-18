---
sidebar_position: 4
---

# Recommenations

### linux (Operation System)

Update your operating system on your target servers before deploying;

Make sure you have time synchronization is configured (NTP).
Specify `ntp_enabled: true` and `ntp_servers` if you want to install and configure the ntp service.

### DCS (Distributed Consensus Store)

Fast drives and a reliable network are the most important factors for the performance and stability of an etcd (or consul) cluster.

Avoid storing etcd (or consul) data on the same drive along with other processes (such as the database) that are intensively using the resources of the disk subsystem! 
Store the etcd and postgresql data on **different** disks (see `etcd_data_dir`, `consul_data_path` variables), use ssd drives if possible.
See [hardware recommendations](https://etcd.io/docs/v3.3/op-guide/hardware/) and [tuning](https://etcd.io/docs/v3.3/tuning/) guides.

It is recommended to deploy the DCS cluster on dedicated servers, separate from the database servers.

### Placement of cluster members in different data centers

If you’d prefer a cross-data center setup, where the replicating databases are located in different data centers, etcd member placement becomes critical.

There are quite a lot of things to consider if you want to create a really robust etcd cluster, but there is one rule: *do not placing all etcd members in your primary data center*. See some [examples](https://www.cybertec-postgresql.com/en/introduction-and-how-to-etcd-clusters-for-patroni/).

### How to prevent data loss in case of autofailover (synchronous_modes)

Due to performance reasons, a synchronous replication is disabled by default.

To minimize the risk of losing data on autofailover, you can configure settings in the following way:
- `synchronous_mode: true`
- `synchronous_mode_strict: true`
- `synchronous_commit: 'on'` (or '`remote_apply`')
