---
sidebar_position: 1
---

# Basic Commands

Basic cluster management commands using the terminal.

## Patroni

:::info
Official [documentation](https://patroni.readthedocs.io/en/latest/)
:::

### Service Operations

#### Check Patroni service status

```
sudo systemctl status patroni
```

#### Stop Patroni service
```
sudo systemctl stop patroni
```

#### Start Patroni service
```
sudo systemctl start patroni
```

#### Restart Patroni service
```shell
sudo systemctl restart patroni
```

:::info
When executing commands such as stop, start, or restart, Patroni also restarts the Postgres service, unless the Patroni cluster is in maintenance mode.
:::

### logs
View Patroni service logs (last 50 lines, with live updates)
```
sudo journalctl -u patroni -n 50 -f
```

If you use logging to a file (variable `patroni_log_destination: logfile`):
```
sudo tail -n 50 -f /var/log/patroni/patroni.log
```

### CLI (patronictl)

:::tip
For more information on all available options, run `patronictl --help`. Or refer to the official [documentation](https://patroni.readthedocs.io/en/latest/patronictl.html).
:::

#### List the cluster members
```
patronictl list
```
Auto update the screen every 2 seconds and print timestamp:
```
patronictl list -t -W
```

#### Show cluster configuration

```
patronictl show-config <cluster-name>
```

#### Edit cluster configuration

```
patronictl edit-config <cluster-name>
```

#### Reload cluster configuration

```
patronictl reload <cluster-name>
```

Reload for specific cluster member:
```
patronictl reload <cluster-name> <server-name>
```

#### Restart cluster
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

#### Switchover to a replica

```
patronictl switchover <cluster-name>
```

:::note
This is typically done during scheduled maintenance, for example, when you need to perform maintenance on a server currently holding the "leader" role.
:::

#### Failover to a replica

```
patronictl failover <cluster-name>
```

:::note
Usually, this command is not necessary, as Patroni will handle failover automatically. However, it may be required in certain situations, such as when there is no suitable candidate for the leader role (e.q, when the lag specified in the `maximum_lag_on_failover` option is exceeded). Use this command with caution.
:::

#### Show the history of failovers/switchovers

```
patronictl history <cluster-name>
```

#### Disable auto failover (start maintenance mode)

```
patronictl pause <cluster-name> --wait
```

#### Enable auto failover (stop maintenance mode)

```
patronictl resume <cluster-name> --wait
```

#### Reinitialize cluster member

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

### Service Operations

:::note
In a clustered environment, there is no need to manage PostgreSQL services separately, as Patroni handles this automatically. See Patroni "[Service Operations](#service-operations)" section.
:::

### logs

View the list of log files:

```
sudo ls -lth  /var/log/postgresql/
```

View current Postgres log (last 50 lines, with live updates)
```
sudo tail -n 50 -f /var/log/postgresql/$(sudo ls -t  /var/log/postgresql/ | head -n 1)
```

### CLI (psql)

:::tip
For more information on all available options, run `psql --help`. Or refer to the official [documentation](https://www.postgresql.org/docs/current/app-psql.html).
:::

Connect to database "postgres":
```
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres
```

Execute the command:
```
psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "select version()"
```


## etcd

:::info
Official documentation: [Operations guide](https://etcd.io/docs/v3.5/op-guide/)
:::

### Service Operations

#### Check etcd service status

```
sudo systemctl status etcd
```

#### Stop etcd service
```
sudo systemctl stop etcd
```

#### Start etcd service
```
sudo systemctl start etcd
```

#### Restart etcd service
```shell
sudo systemctl restart etcd
```

### logs
View Patroni service logs (last 50 lines, with live updates)
```
sudo journalctl -u etcd -n 50 -f
```

### CLI (etcdctl)

:::tip
For more information on all available options, run `etcdctl --help`
:::

#### Lists all members in the cluster
```
etcdctl member list
```

#### Check the cluster health
```
etcdctl endpoint health --cluster
```

#### Prints out the status of cluster endpoints
```
etcdctl endpoint status --cluster -w table
```


## Consul

It will be published soon.

## PgBouncer

It will be published soon.

## HAProxy

It will be published soon.

## confd

It will be published soon.

## Keepalived

It will be published soon.

## vip-manager

It will be published soon.
