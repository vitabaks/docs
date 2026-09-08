---
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Restore

This section guides you through restoring a PostgreSQL database.

<Tabs defaultValue="console-ui">
  <TabItem value="console-ui" label="Console (UI)">

To restore a cluster in the Console UI, open **Clusters** in the sidebar, select **Backups**, and click **Restore**.

The **Restore cluster** dialog provides three restore modes:

### Latest

Select **Latest** to recover the cluster to the latest available state. By default, recovery replays all available WAL files from the archive.

:::info
Optionally enable **Immediate recovery** to stop recovery as soon as a consistent state is reached instead of replaying all available WAL files.
This option is typically used when the recovery must complete as quickly as possible, for example, for very large databases.
Use this option with caution: it directly affects the recovery point objective (RPO), because the most recent WAL records may not be replayed.
:::

<ThemedImage
  alt="Restore cluster using the latest available state"
  sources={{
    light: '/img/restore-latest.png',
    dark: '/img/restore-latest.dark.png',
  }}
/>

### Point in time

Select **Point in time** to restore the cluster to a specific date and time. Enter the **Date** and **Time**, and adjust the **UTC offset** to match the timezone of the recovery target.

<ThemedImage
  alt="Restore cluster to a point in time"
  sources={{
    light: '/img/restore-pitr.png',
    dark: '/img/restore-pitr.dark.png',
  }}
/>

### Specific backup

Select **Specific backup** to restore the cluster from a particular backup. Choose the required **Backup ID** from the list of available backups.

<ThemedImage
  alt="Restore cluster from a specific backup"
  sources={{
    light: '/img/restore-backup.png',
    dark: '/img/restore-backup.png.png',
  }}
/>

:::info
The **Target timeline** option is available only when **Expert Mode** is enabled. It defaults to `latest`; you can select `current`, `latest`, or specify a timeline ID.
:::

:::warning
For all restore modes, the cluster data will be replaced and the cluster will be unavailable during recovery. Recovery time depends on the amount of data and disk performance.
:::

Confirm that you understand the impact, then click **Restore cluster** to start the recovery.

Wait for the restore to complete. You can monitor its progress and view the logs on the **Operations** page.

  </TabItem>
  <TabItem value="command-line" label="Command line">

The `restore_pgcluster` playbook restores the current PostgreSQL cluster from a pgBackRest or WAL-G backup. When needed, it prepares the recovery and Patroni configuration, then restores the master and replica nodes.

To restore the cluster run the following command:

```bash
docker run --rm -it \
  -e ANSIBLE_SSH_ARGS="-F none" \
  -e ANSIBLE_INVENTORY=/project/inventory \
  -v $PWD:/project \
  -v $HOME/.ssh:/root/.ssh \
  autobase/automation:2.11.0 \
    ansible-playbook restore_pgcluster.yml
```

Use the following variables to select the recovery target:

```yaml
# Optional. Restore a specific backup set. An empty value uses the latest backup.
restore_backup_name: "20260625-120000F_20260626-120000I"

# Optional. Stop recovery as soon as a consistent state is reached.
restore_immediate: true

# Optional. Restore to a specific point in time, for example:
restore_target_time: "2026-06-26 11:00:00+00"

# Optional. Recovery timeline: current, latest, or a timeline ID.
restore_target_timeline: latest

# Optional. Action after reaching the recovery target: pause, promote, or shutdown.
restore_target_action: promote
```

If no target time or immediate recovery is configured, the playbook performs a restore from latest backup and replays the available WAL records.
It also prints recovery details from the PostgreSQL log when the operation completes.

  </TabItem>
</Tabs>
