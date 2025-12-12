---
sidebar_position: 40
---

# Restore

Restore and Cloning

## Console (UI)

Restoring a cluster from backup (PITR) is currently supported only through the command line.

:::tip
If you’re interested in having this functionality available through the UI, please consider becoming a [sponsor](/docs/sponsor).
:::

## Command line

You can restore your PostgreSQL cluster in place (Point-In-Time Recovery), which is useful for recovering an existing cluster, or create a new cluster from a backup (Cloning), which involves creating a new cluster based on an existing backup.

The following backup tools are supported:
- [pgBackRest](https://github.com/pgbackrest/pgbackrest)
- [WAL-G](https://github.com/wal-g/wal-g)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="pgBackRest" label="pgBackRest" default>

Whether you want to restore the current cluster or perform cloning, you will need to configure the pgBackRest parameters to access the backups.

:::tip
You can find examples of `pgbackrest` configurations in the [Backup](/docs/management/backup) section.
:::

Additionally, define the following required variables for the restore process:

```yaml
patroni_cluster_bootstrap_method: "pgbackrest"
```

```yaml
# Optional. To restore replicas from a backup.
# Otherwise, they fetch data from the Primary server after it’s restored.
patroni_create_replica_methods:
  - pgbackrest
```

```yaml
# WAL file recovery command — required for performing Point-in-Time Recovery (PITR).
postgresql_restore_command: "/usr/bin/pgbackrest --stanza={{ pgbackrest_stanza }} archive-get %f %p"
```

To restore the cluster from last backup (including all WALs):
```yaml
pgbackrest_patroni_cluster_restore_command: '/usr/bin/pgbackrest --stanza={{ pgbackrest_stanza }} --delta restore'
```

:::warning
Recovery may error unless `--type=immediate` is specified. This is because after consistency is reached PostgreSQL will flag zeroed pages as errors even for a full-page write. For PostgreSQL ≥ 13 the `ignore_invalid_pages` setting may be used to ignore invalid pages. In this case it is important to check the logs after recovery to ensure that no invalid pages were reported in the selected databases.
:::

Or, to restore the cluster from last backup (`immediate`):
```yaml
# This parameter specifies that recovery should end as soon as a consistent state is reached, i.e., as early as possible.
# When restoring from an online backup, this means the point where taking the backup ended.
pgbackrest_patroni_cluster_restore_command: '/usr/bin/pgbackrest --stanza={{ pgbackrest_stanza }} --type=immediate --delta restore'
```

Or, to restore the cluster to specific time (PITR):
```yaml
# Restore to 2024-08-19 03:02:07.322658+00
pgbackrest_patroni_cluster_restore_command: '/usr/bin/pgbackrest --stanza={{ pgbackrest_stanza }} --type=time --target="2024-08-19 03:02:07.322658+00" --delta restore'
```

The recovery steps that automation will perform:

<details>
<summary>Click here to expand...</summary>

1. Stop patroni service on the Replica servers;
2. Stop patroni service on the Master server;
3. Remove patroni cluster from DCS;
4. Run "`/usr/bin/pgbackrest --stanza=<stanza_name> --delta restore`" on Master;
5. Run "`/usr/bin/pgbackrest --stanza=<stanza_name> --delta restore`" on Replica;
   - Note: if 'pgbackrest' in 'patroni_create_replica_methods' variable.
6. Waiting for restore from backup;
   - Note: timeout 24 hours.
7. Start PostgreSQL for Recovery;
8. Waiting for PostgreSQL Recovery to complete (WAL apply);
9. Stop PostgreSQL instance (if running);
10. Disable PostgreSQL `archive_command` (if enabled);
    - Note: if 'disable_archive_command' variable is 'true'.
11. Start patroni service on the Master server;
12. Check PostgreSQL is started and accepting connections on Master;
13. Make sure the PostgreSQL users (superuser and replication) are present;
    - and password does not differ from the specified in variables.
14. Update PostgreSQL authentication parameter in `patroni.yml`
    - Note: if superuser or replication users is changed.
15. Start patroni service on Replica servers;
16. Check that the patroni is healthy on the replica server;
    - Note: timeout 10 hours.
17. Check PostgreSQL cluster health (finish).

</details>

  </TabItem>
  <TabItem value="WAL-G" label="WAL-G">

Whether you want to restore the current cluster or perform cloning, you will need to configure the WAL-G parameters to access the backups.

:::tip
You can find examples of `wal-g` configurations in the [Backup](/docs/management/backup) section.
:::

Additionally, define the following required variables for the restore process:

```yaml
patroni_cluster_bootstrap_method: "wal-g"
```
```yaml
# Optional. To restore replicas from a backup.
# Otherwise, they fetch data from the Primary server after it’s restored.
patroni_create_replica_methods:
  - wal_g
```

```yaml
# # WAL file recovery command — required for performing Point-in-Time Recovery (PITR).
postgresql_restore_command: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json wal-fetch %f %p"
```

To restore the cluster from last backup (including all WALs):
```yaml
wal_g_patroni_cluster_bootstrap_command: "/usr/local/bin/wal-g --config {{ postgresql_home_dir }}/.walg.json backup-fetch {{ postgresql_data_dir }} LATEST"
```

  </TabItem>
</Tabs>

### Restore

To restore the current cluster (PITR) run the following command:

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.5.2 \
    ansible-playbook deploy_pgcluster.yml \
      -t point_in_time_recovery \
      -e disable_archive_command=false
```

:::info
We set `disable_archive_command` to `false` so as not to disable `archive_command` after the restore.
:::

### Cloning

To clone the cluster run the following command:

```
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.5.2 \
    ansible-playbook deploy_pgcluster.yml \
      -e disable_archive_command=true \
      -e keep_patroni_dynamic_json=false
```

:::info
We set `disable_archive_command` to `true` to disable the `archive_command` after the restore. This is necessary to prevent conflicts in the archived log storage when multiple clusters attempt to archive WALs to the same storage.

We also set `keep_patroni_dynamic_json` to `false` to remove the `patroni.dynamic.json` file after the restore. This ensures that the new parameters specified in variables are applied, rather than restoring the cluster with the parameters used when the backup was created.
:::
