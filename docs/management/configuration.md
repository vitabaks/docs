---
sidebar_position: 20
---

# Configuration

This section guides you through the process of changes your PostgreSQL cluster configuration.

### Console (UI)

Cluster configuration changes are currently supported only through the command line.

:::tip
If you’re interested in having this functionality available through the UI, please consider becoming a [sponsor](/docs/sponsor).
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
