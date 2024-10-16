---
sidebar_position: 2
---

# Configuration

This section guides you through the process of changes your PostgreSQL Cluster configuration.

### Console (UI)

Changing the cluster configuration through the UI is not yet implemented.

:::tip
If you're interested in this feature, please consider becoming a [sponsor](/docs/sponsor).
:::

### Command line

To change the PostgreSQL configuration in a cluster using automation:

1. Modify the desired parameters in the variable file (e.g., `postgresql_parameters`).
2. Run the `config_pgcluster.yml` playbook to apply the changes.

```
ansible-playbook config_pgcluster.yml
```

:::info
Optionally, set `pending_restart: true` to automatically restart PostgreSQL if the parameter change requires a restart.
:::
