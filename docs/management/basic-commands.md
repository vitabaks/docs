---
sidebar_position: 1
---

# Basic Commands

Basic cluster management commands using the command line.

This guide covers the basic commands for managing various services in your PostgreSQL cluster. It includes instructions for working with Patroni, PostgreSQL, PgBouncer, etcd, and other essential services.

For more detailed information about the cluster's architecture and components, please refer to the [Architecture](../overview/architecture.md) page.


## Patroni

:::info
Official [documentation](https://patroni.readthedocs.io/en/latest/)
:::

**Service**

Check Patroni service status:

```
sudo systemctl status patroni
```

Stop Patroni service:
```
sudo systemctl stop patroni
```

Start Patroni service:
```
sudo systemctl start patroni
```

Restart Patroni service:
```
sudo systemctl restart patroni
```

Reload Patroni service:
```
sudo systemctl reload patroni
```

:::info
When executing commands such as stop, start, or restart, Patroni also restarts the Postgres service, unless the Patroni cluster is in maintenance mode.
:::

**logs**

View Patroni service logs (last 50 lines, with live updates):
```
sudo journalctl -u patroni -n 50 -f
```

If you use logging to a file (variable `patroni_log_destination: logfile`):
```
sudo tail -n 50 -f /var/log/patroni/patroni.log
```

**CLI (patronictl)**

:::tip
For more information on all available options, run `patronictl --help`. Or refer to the patronictl [documentation](https://patroni.readthedocs.io/en/latest/patronictl.html).
:::

List the cluster members:
```
patronictl list
```
Auto update the screen every 2 seconds and print timestamp:
```
patronictl list -t -W
```

Show cluster configuration:

```
patronictl show-config <cluster-name>
```

Edit cluster configuration:

```
patronictl edit-config <cluster-name>
```

Reload cluster configuration:

```
patronictl reload <cluster-name>
```

Reload for specific cluster member:
```
patronictl reload <cluster-name> <server-name>
```

Restart cluster:
```
patronictl restart <cluster-name>
```

Restart specific cluster member:
```
patronictl restart <cluster-name> <server-name>
```

:::note
This command restarts the Postgres service but does not affect the Patroni service. If you need to restart the Patroni service, use the `systemctl restart patroni` command.
:::

Switchover to a replica:

```
patronictl switchover <cluster-name>
```

:::note
This is typically done during scheduled maintenance, for example, when you need to perform maintenance on a server currently holding the "leader" role.
:::

Failover to a replica:

```
patronictl failover <cluster-name>
```

:::note
Usually, this command is not necessary, as Patroni will handle failover automatically. However, it may be required in certain situations, such as when there is no suitable candidate for the leader role (e.q, when the lag specified in the `maximum_lag_on_failover` option is exceeded). Use this command with caution.
:::

Show the history of failovers/switchovers:

```
patronictl history <cluster-name>
```

Disable auto failover (start maintenance mode):

```
patronictl pause <cluster-name> --wait
```

:::note
Maintenance mode is an option in Patroni that allows you to pause automatic failover. \
This can be useful in scenarios such as performing a PostgreSQL upgrade or during DCS maintenance, where you may need to temporarily disable automatic cluster management. Without this mode, if the master becomes unavailable, Patroni will automatically promote a replica to the leader role.
:::

Enable auto failover (stop maintenance mode):

```
patronictl resume <cluster-name> --wait
```

Reinitialize cluster member:

```
patronictl reinit <cluster-name> <server-name>
```

:::note
This command is used when you need to reinitialize the database data files on a replica, for example, if it has fallen significantly behind (high replocation lag). Patroni will delete the data directory and re-create it using the methods defined in the `create_replica_methods` option.
:::


## PostgreSQL

:::info
Official [documentation](https://www.postgresql.org/docs/current/index.html)
:::

**Service**

:::note
In a clustered environment, there is no need to manage PostgreSQL services separately, as Patroni handles this automatically. See Patroni "[Service](#service-operations)" section.
:::

**logs**

View the list of log files:

```
sudo ls -lth /var/log/postgresql/
```

View current Postgres log (last 50 lines, with live updates):
```
sudo tail -n 50 -f $(ls -t /var/log/postgresql/*.log | head -n 1)
```

**CLI (psql)**

:::tip
For more information on all available options, run `psql --help`. Or refer to the psql [documentation](https://www.postgresql.org/docs/current/app-psql.html).
:::

Connect to database "postgres":
```
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres
```

Execute the SQL command:
```
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "select version()"
```


## PgBouncer

:::info
Official [documentation](https://www.pgbouncer.org)
:::

**Service**

Check pgbouncer service status:
```
sudo systemctl status pgbouncer
```

Stop pgbouncer service:
```
sudo systemctl stop pgbouncer
```

Start pgbouncer service:
```
sudo systemctl start pgbouncer
```

Restart pgbouncer service:
```
sudo systemctl restart pgbouncer
```

Reload pgbouncer service:
```
sudo systemctl reload pgbouncer
```

**logs**

View pgbouncer service logs (last 50 lines, with live updates):
```
sudo tail -n 50 -f /var/log/pgbouncer/pgbouncer.log
```

**CLI (psql)**

:::tip
For more information on all available options, run `SHOW HELP`. Or refer to the [documentation](https://www.pgbouncer.org/usage.html).
:::

Connect to pgbouncer database:
```
psql -h 127.0.0.1 -p 6432 -U postgres -d pgbouncer
```

Show databases:
```
SHOW DATABASES;
```

Show pools:
```
SHOW POOLS;
```

Show stats:
```
SHOW STATS;
```

## HAProxy

:::info
Official [documentation](http://docs.haproxy.org)
:::

**Service**

Check haproxy service status:
```
sudo systemctl status haproxy
```

Stop haproxy service:
```
sudo systemctl stop haproxy
```

Start haproxy service:
```
sudo systemctl start haproxy
```

Restart haproxy service:
```
sudo systemctl restart haproxy
```

Reload haproxy service:
```
sudo systemctl reload haproxy
```

**logs**

View haproxy service logs (last 50 lines, with live updates):
```
sudo journalctl -u haproxy -n 50 -f
```
```
sudo tail -n 50 -f /var/log/haproxy.log
```

**Stats**

To view HAProxy statistics, navigate to the following URL in your web browser: \
`http://<server-ip>:7000`


## confd

:::info
Used to automate HAProxy configuration file management.

Official [documentation](https://github.com/kelseyhightower/confd/tree/master/docs)
:::

**Configuration files**
```
/etc/confd/confd.toml
/etc/confd/conf.d/haproxy.toml
/etc/confd/templates/haproxy.tmpl
```

:::tip
To update HAProxy configuration, edit the template located at: `/etc/confd/templates/haproxy.tmpl` \
Then reload the `confd` service. Changes will be applied automatically during the next update.
:::

**Service**

Check confd service status:
```
sudo systemctl status confd
```

Stop confd service:
```
sudo systemctl stop confd
```

Start confd service:
```
sudo systemctl start confd
```

Restart confd service:
```
sudo systemctl restart confd
```

Reload confd service:
```
sudo systemctl reload confd
```

**logs**

View confd service logs (last 50 lines, with live updates):
```
sudo journalctl -u confd -n 50 -f
```


## Keepalived

:::info
Official [documentation](https://www.keepalived.org/manpage.html)
:::

**Service**

Check pgbouncer keepalived status:
```
sudo systemctl status keepalived
```

Stop keepalived service:
```
sudo systemctl stop keepalived
```

Start keepalived service:
```
sudo systemctl start keepalived
```

Restart keepalived service:
```
sudo systemctl restart keepalived
```

Reload keepalived service:
```
sudo systemctl reload keepalived
```

**logs**

View keepalived service logs (last 50 lines, with live updates):
```
sudo journalctl -u keepalived -n 50 -f
```

**CLI (ip)**

Check the IP address list:
```
ip a
```


## vip-manager

:::info
Official [documentation](https://www.keepalived.org/manpage.html)
:::

**Service**

Check vip-manager service status:
```
sudo systemctl status vip-manager
```

Stop vip-manager service:
```
sudo systemctl stop vip-manager
```

Start vip-manager service:
```
sudo systemctl start vip-manager
```

Restart vip-manager service:
```
sudo systemctl restart vip-manager
```

Reload vip-manager service:
```
sudo systemctl reload vip-manager
```

:::warning
When the vip-manager service is stopped, the VIP address is [removed](https://github.com/vitabaks/postgresql_cluster/blob/master/automation/roles/vip-manager/templates/vip-manager.service.j2#L12). It will be re-added when the service starts again, provided that the current server is the leader.
:::

**logs**

View vip-manager service logs (last 50 lines, with live updates):
```
sudo journalctl -u vip-manager -n 50 -f
```

**CLI (ip)**

Check the IP address list:
```
ip a
```


## etcd

:::info
Official documentation: [Operations guide](https://etcd.io/docs/v3.5/op-guide/)
:::

**Service**

Check etcd service status:
```
sudo systemctl status etcd
```

Stop etcd service:
```
sudo systemctl stop etcd
```

Start etcd service:
```
sudo systemctl start etcd
```

Restart etcd service:
```
sudo systemctl restart etcd
```

Reload etcd service:
```
sudo systemctl reload etcd
```

**logs**

View etcd service logs (last 50 lines, with live updates):
```
sudo journalctl -u etcd -n 50 -f
```

**CLI (etcdctl)**

:::tip
For more information on all available options, run `etcdctl --help`
:::

Lists all members in the cluster:
```
etcdctl member list
```

Check the cluster health:
```
etcdctl endpoint health --cluster
```

Prints out the status of cluster endpoints:
```
etcdctl endpoint status --cluster -w table
```

## Consul

**Service**

Check consul service status:
```
sudo systemctl status consul
```

Stop consul service:
```
sudo systemctl stop consul
```

Start consul service:
```
sudo systemctl start consul
```

Restart consul service:
```
sudo systemctl restart consul
```

Reload consul service:
```
sudo systemctl reload consul
```

**logs**

View Consul service logs (last 50 lines, with live updates):
```
sudo journalctl -u consul -n 50 -f
```

#### CLI (consul)

:::tip
For more information on all available options, run `consul --help`
:::

List all members in the cluster:
```
consul members
```

Check the health of the cluster:
```
consul operator raft list-peers
```

Print out the status of all services in the cluster:
```
consul catalog services
```

List all nodes running a specific service (e.g., postgres-cluster):
```
consul catalog nodes -service=<cluster-name>
```

#### CLI (dig)

Resolve DNS for the master node of the cluster:
```
dig @127.0.0.1 -p 8600 +short master.<cluster-name>.service.consul SRV
```

Resolve DNS for the replica nodes of the cluster:
```
dig @127.0.0.1 -p 8600 +short replica.<cluster-name>.service.consul SRV
```
