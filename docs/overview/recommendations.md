---
sidebar_position: 4
---

# Recommendations

This section provides essential recommendations to ensure the optimal performance, stability, and reliability of your PostgreSQL High-Availability Cluster. Following these guidelines will help you avoid common pitfalls and make the most of your deployment.

### Linux (Operating System)

Before deploying your PostgreSQL cluster, make sure your target servers are running an up-to-date operating system. Proper system maintenance is crucial for security and performance.

Additionally, ensure that time synchronization is correctly configured (NTP). For automated setup, specify `ntp_enabled: true` and set `ntp_servers` to install and configure the NTP service.

### Distributed Consensus Store (DCS)

The performance and stability of your etcd or consul cluster are highly dependent on fast drives and a reliable network. To optimize these factors:

- Avoid storing etcd or consul data on the same disk as other resource-intensive processes, like the database. Ensure that etcd/consul and PostgreSQL data are stored on **separate** disks (`etcd_data_dir`, `consul_data_path` variables), and use SSDs if possible.
- It is recommended to deploy your DCS cluster on dedicated servers, separate from your database servers, to minimize resource contention.
- For further optimization, consult the [hardware recommendations](https://etcd.io/docs/v3.5/op-guide/hardware/) and [tuning guides](https://etcd.io/docs/v3.5/tuning/).

### Placement of cluster members across different data centers

For setups involving multiple data centers, careful consideration of DCS (etcd or consul) member placement is critical. Avoid placing all DCS members in a single primary data center to reduce the risk of cluster failure. A balanced and strategic placement of cluster members across data centers enhances redundancy and resilience. For detailed guidance, see [examples](https://www.cybertec-postgresql.com/en/introduction-and-how-to-etcd-clusters-for-patroni/).

### Preventing data loss during autofailover (synchronous modes)

Synchronous replication is disabled by default for performance reasons. However, to minimize the risk of data loss during autofailover, you can enable and configure synchronous replication:

- `synchronous_mode: true`
- `synchronous_mode_strict: true`
- `synchronous_commit: 'on'` (or `remote_apply`)

Following these settings will ensure that all committed transactions are acknowledged by at least one replica, reducing the risk of data loss.
