---
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Configuration

This section guides you through changing your PostgreSQL cluster configuration.

<Tabs defaultValue="console-ui">
  <TabItem value="console-ui" label="Console (UI)">

    Click the name of your cluster on the **Clusters** page, then open the **Parameters** tab to view and edit cluster settings.

    ### Cluster

    View and modify general cluster settings such as synchronous replication, disk size, IOPS, throughput, networking options, and the index maintenance.

    <ThemedImage
      alt="cluster-parameters"
      sources={{
        light: '/img/cluster-edit.png',
        dark: '/img/cluster-edit.dark.png',
      }}
      style={{ width: '80%' }}
    />

    ### Postgres

    Configure PostgreSQL-specific runtime parameters (for example, autovacuum settings, WAL and checkpoint behavior, memory-related parameters). Use the search and filters to find parameters and review which settings require a restart.

    <ThemedImage
      alt="postgres-parameters"
      sources={{
        light: '/img/postgres-edit.png',
        dark: '/img/postgres-edit.dark.png',
      }}
    />

    ### HBA

    Manage PostgreSQL host-based authentication (HBA) rules. Add, edit, or remove rules that control which hosts and users can connect and which authentication methods are enforced.

    <ThemedImage
      alt="hba-rules"
      sources={{
        light: '/img/postgres-hba-edit.png',
        dark: '/img/postgres-hba-edit.dark.png',
      }}
    />

    ### Connection Pools

    Configure connection pool settings and individual pools. Set pool counts, pool modes, max client connections, and per-pool parameters to control how client connections are multiplexed.

    <ThemedImage
      alt="connection-pools"
      sources={{
        light: '/img/pools-edit.png',
        dark: '/img/pools-edit.dark.png',
      }}
      style={{ width: '70%' }}
    />

    ### System

    :::info
    The **System** tab is available when **Expert Mode** is enabled. To enable it, go to the **Settings** page and turn on “Enable expert mode”.
    :::

    Edit the advanced system configuration, including Regional Settings, Host Mappings, DNS Servers, NTP Servers, Kernel Parameters, and SSH Public Keys.

    <ThemedImage
      alt="system-parameters"
      sources={{
        light: '/img/system-edit.png',
        dark: '/img/system-edit.dark.png',
      }}
      style={{ width: '80%' }}
    />
    <ThemedImage
      alt="system-parameters"
      sources={{
        light: '/img/system-edit-2.png',
        dark: '/img/system-edit-2.dark.png',
      }}
      style={{ width: '80%' }}
    />

    ### YAML Editor

    :::info
    To use the YAML editor, go to the **Settings** page and turn on “Enable expert mode” and “Enable YAML editor”.
    :::

    The YAML editor allows experienced users to configure any available options. Refer to the [defaults](https://github.com/autobase-tech/autobase/blob/2.11.0/automation/roles/common/defaults/main.yml).

    <ThemedImage
      alt="yaml-editor"
      sources={{
        light: '/img/yaml-edit.png',
        dark: '/img/yaml-edit.dark.png',
      }}
    />

    To apply configuration changes:

    1. Open the cluster.
    2. Click the **YAML** icon in the top-right corner of the cluster page.
    3. Update the required options.
    4. Select **Show Diff** to review the changes.
    5. Click **Apply changes** to apply the configuration.

  </TabItem>
  <TabItem value="command-line" label="Command line">

    To change the cluster configuration using the automation image:

    1. Modify the desired parameters (for example, `postgresql_parameters`).
    :::info
    Refer to the [default](https://github.com/autobase-tech/autobase/blob/2.11.0/automation/roles/common/defaults/main.yml) values; override them as needed using group_vars, host_vars, or directly in the inventory file.
    :::
    2. Run the `config_pgcluster.yml` playbook to apply the changes.

    Example:
    ```
    docker run --rm -it \
      -e ANSIBLE_SSH_ARGS="-F none" \
      -e ANSIBLE_INVENTORY=/project/inventory \
      -v $PWD:/project \
      -v $HOME/.ssh:/root/.ssh \
      autobase/automation:2.11.0 \
        ansible-playbook config_pgcluster.yml
    ```

    :::note
    Optionally, set `pending_restart: true` to automatically restart PostgreSQL if the parameter change requires a restart.
    :::

    :::tip
    You can use GitOps and [CI/CD](gitops.md) pipelines to manage PostgreSQL configuration in a fully automated and reproducible way.
    :::

  </TabItem>
</Tabs>
